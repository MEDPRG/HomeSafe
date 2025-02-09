import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../confignotification";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("CARDING");
  useEffect(async () => {
    todoRef.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { heading, text, val } = doc.data();
        users.push({
          id: doc.id,
          heading,
          text,
          val,
        });
      });
      setUsers(users);
    });
  }, []);

  const clickedItem = (data) => {
    navigation.navigate("Details", { data: data });
  };
  const renderCard = ({ item }) => (
    <Card style={styles.container}>
      <Text
        style={{ fontSize: 23, fontWeight: "500" }}
        onPress={() => clickedItem(item)}
      >
        {item.heading}
      </Text>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={users.reverse()}
        numColumns={1}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
  },
});
