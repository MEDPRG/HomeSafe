import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

function Resetpassword(props) {
  const email = props.route.params.data;
  const [verification_code, setVerification_code] = useState("");
  const [confirmation_code, setConfirmation_code] = useState("");
  const navigation = useNavigation();

  const handleVerification = () => {
    if (verification_code !== confirmation_code) {
      Alert.alert(
        "Invalid Input",
        "Please the password and its confirmation are not compatible.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    } else {
      const confirm = {
        email: email,
        verification_code: verification_code,
        confirmation_code: confirmation_code,
      };

      //send A post request to the backend API
      axios
        .post("http://192.168.1.2:8000/reset", confirm)
        .then((response) => {
          console.log(response);
          console.log("HERERRR");
          navigation.replace("Login");
          Alert.alert(
            "Reseting Successfull",
            "You have Reset Password successfully"
          );
          setVerification_code("");
          setConfirmation_code("");
        })
        .catch((error) => {
          Alert.alert(
            "Reseting Error",
            "an error occurred during Reseting Password"
          );
          console.log("Reseting failed", error);
        });
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ marginTop: 20, width: 250, height: 300 }}
          source={require("../assets/2.png")}
        />
      </View>
      <Text
        style={{
          marginTop: -70,
          marginBottom: 24,
          fontSize: 30,
          color: "#111",
        }}
      >
        Reset Your Password
      </Text>
      <View style={{ marginTop: 5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#D0D0D0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <AntDesign
            name="lock1"
            size={24}
            color="gray"
            style={{ marginLeft: 8 }}
          />
          <TextInput
            value={verification_code}
            onChangeText={(text) => setVerification_code(text)}
            secureTextEntry={true}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              fontSize: verification_code ? 16 : 16,
            }}
            placeholder="Enter Your New Password"
          />
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#D0D0D0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <AntDesign
            name="lock1"
            size={24}
            color="gray"
            style={{ marginLeft: 8 }}
          />
          <TextInput
            value={confirmation_code}
            onChangeText={(text) => setConfirmation_code(text)}
            secureTextEntry={true}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              fontSize: email ? 16 : 16,
            }}
            placeholder="Confirm Your New Password"
          />
        </View>
      </View>
      <Pressable
        onPress={handleVerification}
        style={{
          width: 250,
          backgroundColor: "#007FFF",
          borderRadius: 6,
          marginTop: 50,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 13,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Reset Password
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Resetpassword;

const styles = StyleSheet.create({});
