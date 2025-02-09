import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../navigation/UserContext";

const PROFILE_PICTURE = require("../assets/profile.jpg");

const SettingScreen = () => {
  const { user } = useContext(UserContext);
  console.log("User Data:", user);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt="Profile picture"
                source={PROFILE_PICTURE}
                style={styles.profileAvatar}
              />
              <View style={styles.profileAction}>
                <Feather name="edit-3" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.profilerealName}>Admin</Text>
          <Text style={styles.profileName}>{user.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account</Text>

          {/* Privacy */}

          <TouchableOpacity
            onPress={() => {
              //handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "blue" }]}>
                <MaterialIcons name="privacy-tip" size={32} color="black" />
              </View>
              <Text style={styles.rowLabel}>Privacy</Text>
              <View style={{ flex: 1 }} />
              <Feather name="chevron-right" size={32} color="black" />
            </View>
          </TouchableOpacity>

          {/* About */}

          <TouchableOpacity
            onPress={() => {
              //handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "green" }]}>
                <AntDesign name="exclamationcircleo" size={32} color="black" />
              </View>
              <Text style={styles.rowLabel}>About</Text>
              <View style={{ flex: 1 }} />
              <Feather name="chevron-right" size={32} color="black" />
            </View>
          </TouchableOpacity>

          {/* Help */}

          <TouchableOpacity
            onPress={() => {
              //handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "orange" }]}>
                <Ionicons name="help-buoy-sharp" size={32} color="black" />
              </View>
              <Text style={styles.rowLabel}>Help</Text>
              <View style={{ flex: 1 }} />
              <Feather name="chevron-right" size={32} color="black" />
            </View>
          </TouchableOpacity>
          {/* LogOut */}
          <TouchableOpacity
            onPress={() => {
              onPress = (AsyncStorage.clear(), navigation.replace("Login"));
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon]}>
                <AntDesign name="logout" size={32} color="black" />
              </View>
              <Text style={styles.rowLabel}>Log Out</Text>
              <View style={{ flex: 1 }} />
              <Feather name="chevron-right" size={32} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  profile: {
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007FFF",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileName: {
    marginTop: 5,
    fontSize: 32,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
  },
  profilerealName: {
    marginTop: 20,
    fontSize: 24,
    color: "#EBE9FF",
    textAlign: "center",
    fontWeight: "800",
  },
  profileAvatar: {
    width: 150,
    height: 150,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAction: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    backgroundColor: "#007bff",
    position: "absolute",
    right: 3,
    bottom: -5,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    paddingHorizontal: 10,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 60,
    backgroundColor: "#007FFF",
    borderRadius: 20,
    marginBottom: 17,
    paddingHorizontal: 12,
  },
  rowLabel: {
    fontSize: 20,
    color: "#0c0c0c",
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
});
