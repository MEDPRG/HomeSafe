import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

const VideolistScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.container}>
        <WebView
          source={{ uri: "http://192.168.1.2:8000/live_stream" }}
          style={styles.webView}
        />
      </View>
    </SafeAreaView>
  );
};

export default VideolistScreen;

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  webView: {
    flex: 1,
    alignSelf: "stretch",
  },
});
