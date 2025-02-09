import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../navigation/UserContext";

function OTP(props) {
  const { updateUser } = useContext(UserContext);
  const email = props.route.params.data;
  const [verification_code, setVerification_code] = useState("");
  const navigation = useNavigation();

  const replaceWithAsterisk = (str) => {
    const emailIndex = str.indexOf("@");
    if (emailIndex === -1) {
      // If the string doesn't contain '@', replace everything after the first two characters
      return str.slice(0, 2) + "*".repeat(str.length - 2);
    } else {
      // If the string contains '@', replace everything between the first two characters and '@'
      const prefix = str.slice(0, 2);
      const suffix = str.slice(emailIndex);
      const replacementLength = emailIndex - 2;
      const replacement = "*".repeat(replacementLength);
      return prefix + replacement + suffix;
    }
  };

  const handleVerification = () => {
    const verify = {
      email: email,
      verification_code: verification_code,
    };

    //send A post request to the backend API
    axios
      .post("http://192.168.1.2:8000/verify", verify)
      .then((response) => {
        console.log(response);
        updateUser(response.data);
        navigation.replace("Main");
        Alert.alert(
          "Verification Successfull",
          "You have Verified successfully"
        );
        setVerification_code("");
      })
      .catch((error) => {
        Alert.alert(
          "Verification Error",
          "an error occurred during Verification"
        );
        console.log("verfication failed", error);
      });
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
      <Text style={{ marginTop: -70, fontSize: 25, color: "#111" }}>
        Verify Email
      </Text>
      <Text style={{ marginTop: 10, fontSize: 15, color: "#111" }}>
        Enter code received on Your Email
      </Text>
      <Text style={{ fontSize: 16, color: "#111", marginTop: 14 }}>
        {replaceWithAsterisk(email)}
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
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              fontSize: verification_code ? 16 : 16,
            }}
            placeholder="enter your Name"
          />
        </View>
      </View>
      <Pressable
        onPress={handleVerification}
        style={{
          width: 250,
          backgroundColor: "#007FFF",
          borderRadius: 6,
          marginTop: 20,
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
          Verify
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default OTP;

const styles = StyleSheet.create({});
