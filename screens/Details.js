import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../DeleteConfig";
import { useNavigation } from "@react-navigation/native";

function Details(props) {
  const data = props.route.params.data;
  const navigation = useNavigation();

  const deletData = (data) => {
    deleteDoc(doc(db, "CARDING", data.id));
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.viewStyle}>
        <Text style={{ fontSize: 25 }}>{data.heading}</Text>
        <Text style={{ fontSize: 20, marginTop: 10 }}>{data.text}</Text>
        <Text style={{ fontSize: 15, marginTop: 10 }}>{data.val}</Text>
        <View style={styles.btnStyle}>
          <Button
            icon="delete"
            mode="contained"
            style={{ backgroundColor: "#007FFF" }}
            onPress={() => deletData(data)}
          >
            Delete
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    padding: 10,
    margin: 10,
  },
  btnStyle: {
    margin: 15,
    padding: 40,
  },
});

export default Details;
