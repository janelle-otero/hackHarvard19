import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import firebase from "firebase";
import { SCREENS } from "../constants";

var app = firebase.initializeApp({
  apiKey: "AIzaSyCW7Uf0qvFdDNfjgOhcfjnIwltW11z5v3s",
  authDomain: "hackharvard19project.firebaseapp.com",
  databaseURL: "https://hackharvard19project.firebaseio.com",
  projectId: "hackharvard19project",
  storageBucket: "hackharvard19project.appspot.com",
  messagingSenderId: "637275919090",
  appId: "1:637275919090:web:13a86e85b703e0cf0b766b"
});

function Start(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Image style=
        {{ width: 200, height: 200 }}
        source={require("./logo.png")}
      />
      <Text style={styles.titleText}>BandIt!</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate(SCREENS.SIGNUP)}
      />
    </View>
  );
}

Start.navigationOptions = {
  title: "Start"
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
