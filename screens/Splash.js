import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function Splash() {
  const navigation = useNavigation();

  const handleAnimationFinish = () => {
    const sleepTimer = setTimeout(() => {
      console.log("Waking up after 20 seconds");
      // Any additional logic you want to execute after the delay
    }, 20000);
    clearTimeout(sleepTimer);
    // Navigate to the desired screen after the animation finishes
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <LottieView
        source={require("../assets/splash.json")}
        autoPlay
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
