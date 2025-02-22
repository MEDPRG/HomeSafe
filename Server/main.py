from flask import Flask, jsonify, request, Response
from flask_marshmallow import Marshmallow
from flask_mail import Mail, Message
from flask_socketio import SocketIO
from flask_pymongo import PyMongo
from datetime import datetime
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import secrets
import hashlib
import gridfs
import cv2
from facenet_pytorch import MTCNN, InceptionResnetV1
import torch
from PIL import Image

# PREPARING THE MODEL

# Initializing MTCNN and InceptionResnetV1 (keep_all = False) it means that if 1 image contain multiple faces then it
# will keep just 1 face from that which means keep all these false that's means keep only 1 face
mtcnn0 = MTCNN(image_size=240, margin=0, keep_all=False, min_face_size=40)
# (keep_all = True) it will keep all the images in the form of list
mtcnn = MTCNN(image_size=240, margin=0, keep_all=True, min_face_size=40)
# Initializing the class, and we're passing pretrained model which is vggface2 and if this model isn't already
# downloaded on your computer then when you first run it. it will download automatically
resnet = InceptionResnetV1(pretrained='vggface2').eval()

# instantiate Flask class by creating an app object
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)
bcrypt = Bcrypt(app)
camera = cv2.VideoCapture(0)  # Replace 0 with the appropriate camera index or video file path

# MongoDB connection
app.config['MONGO_URI'] = 'mongodb://localhost:27017/DB_Clients_MG'
mongo = PyMongo(app)
ma = Marshmallow(app)
fs = gridfs.GridFS(mongo.db)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'example@gmail.com'
app.config['MAIL_PASSWORD'] = 'XXXXX-XXXX-XXXXX'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)


class Users:

    def __init__(self, name, email, password, verification_code=None, is_verified=False):
        self.name = name
        self.email = email
        self.password = password
        self.verification_code = verification_code
        self.is_verified = is_verified
        self.date_created = datetime.utcnow()

    def save_to_mongo(self):
        user_data = {
            'name': self.name,
            'email': self.email,
            'password': self.password,
            'verification_code': self.verification_code,
            'is_verified': self.is_verified,
            'date_created': self.date_created
        }
        mongo.db.users.insert_one(user_data)

    @staticmethod
    def from_mongo(email):
        return mongo.db.users.find_one({'email': email})

    def verify(self):
        mongo.db.users.update_one({'email': self.email}, {'$set': {'is_verified': True}})

    def reset_password(self, new_password):
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        mongo.db.users.update_one({'email': self.email}, {'$set': {'password': hashed_password}})

    def send_verification_email(self):
        msg = Message('Verify Your Email', sender='HomeSafe.com', recipients=[self.email])
        msg.body = f'Your verification code is: {self.verification_code}'
        mail.send(msg)

    def delete(self, email):
        users_collection = mongo.db.users
        users_collection.delete_one({'email': email})


# Define Marshmallow User Schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('name', 'email', 'password', 'date', 'is_verified')


# Initialize Marshmallow user schema instances
user_schema = UserSchema()
users_schema = UserSchema(many=True)


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing request data'}), 400
        else:
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return jsonify({'error': 'Missing required fields'}), 400
            else:
                # Perform user authentication here
                # For example, check if the email and password match a user in the database
                user = Users.from_mongo(email)
                if not user or not bcrypt.check_password_hash(user['password'], password):
                    return jsonify({'error': 'Invalid email or password'}), 401

                elif user and not user['is_verified']:
                    # User not verified
                    return jsonify({'error': 'Please verify your email before logging in'}), 403
                else:
                    # Login successful
                    return user_schema.jsonify(user)
    except Exception as e:
        return jsonify({'error': f'Error During Login Process: {e}'}), 401


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing request data'}), 400
        else:
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            if not name or not email or not password:
                return jsonify({'error': 'Missing required fields'}), 400
            else:
                existing_user = Users.from_mongo(email)
                if existing_user:
                    return jsonify({'error': 'Email already registered'}), 409
                else:
                    # Generate a verification code
                    verification_code = secrets.token_hex(16)
                    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

                    new_user = Users(name, email, hashed_password, verification_code)
                    new_user.save_to_mongo()
                    new_user.send_verification_email()
                    return user_schema.jsonify(new_user)

    except Exception as e:
        return jsonify({'error': f'Error sending verification email: {e}'}), 401


@app.route('/verify', methods=['POST'])
def verify_email():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing request data'}), 400
        else:
            email = data.get('email')
            verification_code = data.get('verification_code')

            if not email or not verification_code:
                return jsonify({'error': 'Missing required fields'}), 400
            else:
                user = Users.from_mongo(email)
                if not user:
                    return jsonify({'error': 'Invalid email'}), 404

                if user['verification_code'] != verification_code:
                    return jsonify({'error': 'Invalid verification code'}), 401
                else:
                    user_obj = Users(user['name'], user['email'], user['password'])
                    user_obj.verify()
                    return user_schema.jsonify(user_obj)
    except Exception as e:
        return jsonify({'error': f'Error During Verification Process: {e}'}), 401


@app.route('/reset', methods=['POST'])
def reset():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing request data'}), 400
        else:
            email = data.get('email')
            new_password = data.get('verification_code')
            conf_password = data.get('confirmation_code')

            if not email or not new_password:
                return jsonify({'error': 'Missing required fields'}), 400
            else:
                user = Users.from_mongo(email)
                if not user:
                    return jsonify({'error': 'Invalid email'}), 404
                elif user and (new_password == conf_password):
                    user_obj = Users(user['name'], user['email'], user['password'])
                    user_obj.reset_password(new_password)
                    return user_schema.jsonify(user_obj)
                else:
                    # Verification failed
                    return jsonify({'error': 'Password and its Confirmation Password are not Compatible'}), 401
    except Exception as e:
        return jsonify({'error': f'Error During Resetting Process: {e}'}), 401


@app.route('/reset_verification', methods=['POST'])
def reset_verification():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing request data'}), 400
        else:
            email = data.get('email')

            if not email:
                return jsonify({'error': 'Missing required fields'}), 400
            else:
                user = Users.from_mongo(email)

                if not user:
                    return jsonify({'error': 'Invalid email'}), 404
                else:
                    user_obj = Users(user['name'], user['email'], user['password'])
                    user_obj.verification_code = secrets.token_hex(16)
                    mongo.db.users.update_one({'email': email}, {'$set': {'verification_code': user_obj.verification_code}})
                    user_obj.send_verification_email()
                    return user_schema.jsonify(user_obj)
    except Exception as e:
        return jsonify({'error': f'Error sending verification email: {e}'}), 401


@app.route('/delete/<email>/', methods=['DELETE'])
def delete(email):
    try:
        user = Users.from_mongo(email)
        if user:
            mongo.db.users.delete_one({'email': email})
            return jsonify({'message': 'User deleted successfully'}), 200
        else:
            return jsonify({'error': 'Delete Failed'}), 401
    except Exception as e:
        return jsonify({'error': f'Error Deleting Failed: {e}'}), 401


@app.route('/live_stream', methods=['GET'])
def live_stream_route():
    def generate_frames():
        # Using webcam recognize face

        # Loading data.pt file inside a load list(matrix)
        load_data = torch.load('data.pt')
        embedding_list = load_data[0]
        name_list = load_data[1]
        haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        while True:
            success, frame = camera.read()
            if not success:
                break
            else:
                img = Image.fromarray(frame)  # Convert the frame from NumPyarray to an image
                # mtcnn(img, return_prob=True) will return multiple faces if the image contain multiple faces with
                # their probability ("img_cropped_list") list of multiple faces and  ("prob_list") list of their
                # probabilities

                # Uses MTCNN to detect faces in the input image (img).
                # img_cropped_list contains the cropped face images.
                # prob_list contains the corresponding probabilities/confidences for each detected face.
                img_cropped_list, prob_list = mtcnn(img, return_prob=True)

                if img_cropped_list is not None:
                    # Checks if there is at least one face detected.
                    # If faces are detected, retrieves the bounding boxes (`boxes`) for the detected faces.
                    boxes, _ = mtcnn.detect(img)  # get the list of different boxes that we'll draw on the faces

                    # we'll loop through all the probabilities in ("prob_list")
                    # Loops through the detected faces and their corresponding probabilities.
                    for i, prob in enumerate(prob_list):
                        # Filters faces based on a probability threshold (90% confidence).
                        if prob > 0.90:
                            # Uses a ResNet model (resnet) to extract embeddings from the cropped face.
                            emb = resnet(img_cropped_list[i].unsqueeze(0)).detach()

                            dist_list = []  # list of matched distances, minimum distance is used to identify the person

                            for idx, emb_db in enumerate(embedding_list):
                                # Compares the extracted embedding with embeddings in the database (embedding_list)
                                # using Euclidean distance.
                                dist = torch.dist(emb, emb_db).item()
                                dist_list.append(dist)

                            # Identifies the person based on the minimum distance.
                            min_dist = min(dist_list)  # get the minimum dist value
                            min_dist_idx = dist_list.index(min_dist)  # get the minimum dist index
                            name = name_list[min_dist_idx]  # get the name of the corresponding to minimum dist

                            # Draw Box on the Face:
                            # Retrieves the bounding box for the detected face.
                            box = boxes[i]  # get the box of the face detected from the list of boxes
                            pt1 = (box[0], box[1])
                            pt2 = (box[2], box[3])

                            # Store Original Frame:
                            # Creates a copy of the original frame for further processing or visualization.
                            if min_dist < 0.90:
                                cv2.flip(frame, 180)
                                # show image back to screen
                                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                                # Detect the face in the image
                                face_rect = haar_cascade.detectMultiScale(gray, 1.1, 4)

                                for (x, y, w, h) in face_rect:
                                    cv2.putText(frame, name + ' ' + str(int(min_dist * 100)) + '%', (x, y - 10),
                                                cv2.FONT_HERSHEY_COMPLEX, 0.75, (0, 255, 0), thickness=2)
                                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), thickness=2)
                            else:
                                cv2.flip(frame, 180)
                                # show image back to screen
                                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                                # Detect the face in the image
                                face_rect = haar_cascade.detectMultiScale(gray, 1.1, 4)

                                for (x, y, w, h) in face_rect:
                                    cv2.putText(frame, 'Unknown' + ' ' + str(int(min_dist * 100)) + '%', (x, y - 10),
                                                cv2.FONT_HERSHEY_COMPLEX, 0.75, (0, 255, 0), thickness=2)
                                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), thickness=2)

                ret, buffer = cv2.imencode('.jpg', frame)
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=True, use_reloader=True, log_output=True,
                 allow_unsafe_werkzeug=True)
