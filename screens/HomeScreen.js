import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/SensorCard";
import { db } from "../config";
import { ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const sensors = [
  {
    name: "Fire Sensor",
    image: require("../assets/fire-sensor.png"),
    id: "1",
  },
  {
    name: "Gas Sensor",
    image: require("../assets/gas.jpg"),
    id: "2",
  },
];
const HomeScreen = () => {
  const navigation = useNavigation();
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "posts/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      console.log(newPosts);
      setTodoData(newPosts);
    });
  }, []);
  const getCardColor = (color) => {
    // Implement your logic to determine the card color based on the 'color' value
    // For example:
    if (color === "gas detection" || color === "fire detection") {
      return "red";
    } else {
      return "white"; // Default color
    }
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: "#808080",
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              At Your Home
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Notification")}
            style={{
              width: 60,
              height: 60,
              alignItems: "center",
              borderRadius: 30,
              backgroundColor: "#007FFF",
              position: "absolute",
              top: 10,
              right: 20,
              elevation: 5,
              justifyContent: "center",
            }}
          >
            <Ionicons name="notifications-outline" size={36} color="white" />
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 30,
            padding: 15,
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <View
            style={[
              styles.cardContainer,
              {
                backgroundColor:
                  todoData && todoData[1]
                    ? getCardColor(todoData[1].title.toLowerCase())
                    : "white",
              },
            ]}
          >
            <View>
              <Image style={styles.imageStyle} source={sensors[0].image} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {" "}
                {sensors[0].name}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.cardContainer,
              {
                backgroundColor:
                  todoData && todoData[0]
                    ? getCardColor(todoData[0].title.toLowerCase())
                    : "white",
              },
            ]}
          >
            <View>
              <Image style={styles.imageStyle} source={sensors[1].image} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {" "}
                {sensors[1].name}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth / 2 - 30,
    height: 200,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
    marginBottom: 20,
  },
  imageStyle: {
    height: 130,
    padding: 10,
    width: deviceWidth / 2 - 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    opacity: 1,
  },
  titleContainer: {
    position: "absolute",
    bottom: -40,
    left: 30,
    height: 100,
    backgroundColor: " black",
  },
});
