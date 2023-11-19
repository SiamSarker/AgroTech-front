import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import ProfilePage from "./../Profile/ProfilePage";

const LoginPage = (props: any) => {
  const navHandler = () => {
    props.navigation.navigate("Counter");
  }

  return (
    <View style={style.mainContainer}>
      <View style={style.profileContainer}>
        <ProfilePage />
      </View>
      <Text style={style.text}>Hello TO THE NEW Products PAGE</Text>
      <View style={style.buttonContainer}>
        <Button title='BACK' onPress={navHandler}></Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', // Set background color to red
  },
  profileContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    color: 'green', // Set text color to green
    fontWeight: "700",
    fontSize: 18,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default LoginPage;
