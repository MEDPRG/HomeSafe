import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import VideolistScreen from "../screens/VideolistScreen";
import SettingScreen from "../screens/SettingScreen";
import NotificationScreen from "../screens/NotificationScreen";
import Details from "../screens/Details";
import Splash from "../screens/Splash";
import OTP from "../screens/OTP";
import Resetpassword from "../screens/Resetpassword";
import OTPR from "../screens/OTPR";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { fontSize: 14 },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={32} color="#1f02f7" />
              ) : (
                <AntDesign name="home" size={32} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Videos"
          component={VideolistScreen}
          options={{
            tabBarLabel: "Videos",
            tabBarLabelStyle: { fontSize: 14 },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="play-box-multiple"
                  size={32}
                  color="#1f02f7"
                />
              ) : (
                <MaterialCommunityIcons
                  name="play-box-multiple-outline"
                  size={32}
                  color="black"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarLabelStyle: { fontSize: 14 },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="settings-sharp" size={32} color="#1f02f7" />
              ) : (
                <Ionicons name="settings-outline" size={32} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPR"
          component={OTPR}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            headerStyle: {
              backgroundColor: "#007FFF",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerStyle: {
              backgroundColor: "#007FFF",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Resetpassword"
          component={Resetpassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
