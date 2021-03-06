import firebase from "firebase";
require('firebase/firestore');
import { SCREENS } from "../constants";
import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Image, Button } from "react-native";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";


export default class MoreAboutUser extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '', firstName: '', lastName: '', genderOfUser: '',
    userInstrument: '', userIsSeeking: ''};
  }

  render() {
    return (

      <MenuProvider>
      <View style={styles.container}>
       <View style={{ width: 300, height: 75 }}>
         <Text style={{fontSize: 21}}>First Name</Text>
         <TextInput
           style={styles.input}
           onChangeText = {(text) => this.firstName = text}
         />
       </View>

       <View style={{ width: 300, height: 75 }}>
        <Text style={{fontSize: 21}}>Last Name</Text>
        <TextInput
         style={styles.input}
         onChangeText = {(text) => this.lastName = text}
        />
       </View>

       <View style={{ width: 300, height: 75 }}>
         <Text style={{fontSize: 21}}>Gender</Text>
         <Menu onSelect={(text) => this.genderOfUser = text}>
         <MenuTrigger>
           <Text style={{fontSize: 21}}>Please pick one</Text>
         </MenuTrigger>
         <MenuOptions>
          <MenuOption value={"Male"}>
            <Text style={{fontSize: 21}}>Male</Text>
          </MenuOption>
          <MenuOption value={"Female"}>
            <Text style={{fontSize: 21}}>Female</Text>
          </MenuOption>
         </MenuOptions>
         </Menu>
       </View>

       <View style={{ width: 300, height: 75 }}>
       <Text style={{fontSize: 21}}>What instrument are you jamming with?</Text>
            <Menu onSelect={(text) => this.userInstrument = text}>

              <MenuTrigger>
              <Text style={{fontSize: 21}}>Please pick one</Text>
              </MenuTrigger>

              <MenuOptions>
                <MenuOption>
                  <Text style={{fontSize: 21}}>Acoustic</Text>
                </MenuOption>
                <MenuOption value={"Electric Guitar"}>
                  <Text style={{fontSize: 21}}>Electric Guitar</Text>
                </MenuOption>
                <MenuOption value={"Singer"}>
                  <Text style={{fontSize: 21}}>Vocals</Text>
                </MenuOption>
                <MenuOption value={"Drums"}>
                  <Text style={{fontSize: 21}}>Drums</Text>
                </MenuOption>
                <MenuOption value={"Keyboard"}>
                  <Text style={{fontSize: 21}}>Keyboards</Text>
                </MenuOption>
                <MenuOption value={"Bass"}>
                  <Text style={{fontSize: 21}}>Bass</Text>
                </MenuOption>
              </MenuOptions>
           </Menu>
       </View>

       <View style={{ width: 300, height: 75 }}>
       <Text style={{fontSize: 21}}>Who are you looking to jam with?</Text>
         <Menu onSelect={(text) => this.userIsSeeking = text}>

           <MenuTrigger>
           <Text style={{fontSize: 21}}>Please pick one</Text>
           </MenuTrigger>

           <MenuOptions>
             <MenuOption value={"Acoustic Guitarist"}>
               <Text style={{fontSize: 21}}>Acoustic</Text>
             </MenuOption>
             <MenuOption value={"Electric Guitarist"}>
               <Text style={{fontSize: 21}}>Electric Guitar</Text>
             </MenuOption>
             <MenuOption value={"Singer"}>
               <Text style={{fontSize: 21}}>Vocals</Text>
             </MenuOption>
             <MenuOption value={"Drummer"}>
               <Text style={{fontSize: 21}}>Drums</Text>
             </MenuOption>
             <MenuOption value={"Keyboard"}>
               <Text style={{fontSize: 21}}>Keyboards</Text>
             </MenuOption>
             <MenuOption value={"Bassist"}>
               <Text style={{fontSize: 21}}>Bass</Text>
             </MenuOption>
             <MenuOption value={"Anyone!"}>
               <Text style={{fontSize: 21}}>Not sure/More than one</Text>
             </MenuOption>
           </MenuOptions>
         </Menu>
         </View>

       <Button
        title="Let's Jam!"
        onPress={() => updateUser(this.firstName + "", this.lastName + "", this.genderOfUser
        + "", this.userInstrument + "", this.userIsSeeking + "", this.props.navigation)}
       />
       <Button
        title="Go Back to Start"
        onPress={() => this.props.navigation.navigate(SCREENS.START)}
       />
       </View>
       </MenuProvider>
    )
  };
};


function updateUser(fname, lname, gender, inst, seeking, nav)
{
  var user = firebase.auth().currentUser;
  var uid = "";
  if(user != null) {
    uid = user.uid;
    console.log("logged in as " + uid);
    db = firebase.firestore();
    // Add a new document in collection "uid"
    db.collection(uid).doc("userInfo").set({
      firstName: fname,
      lastName: lname,
      gender: gender,
      instrument: inst,
      isSeeking: seeking
    })
    .then(function() {
      console.log("Document successfully written!");
      nav.navigate(SCREENS.HOME);
    })
    .catch(function(error) {
      alert("Error writing document: " + error);
      nav.navigate(SCREENS.MOREABOUTUSER);
    });
  } else {
    alert("You are not logged in! Please create an account.");
    nav.navigate(SCREENS.SIGNUP);
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  input: {
    fontSize: 21,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  // Text + TextInput: {
  //   margin-top: 10px;
  // }
});
