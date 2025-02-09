import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const SensorCard = ({ info }) => {
  const { name, image } = info;
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image style={styles.imageStyle} source={image} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}> {name}</Text>
      </View>
    </View>
  );
};

export default SensorCard;
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
