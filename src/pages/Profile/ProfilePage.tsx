import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

const ProfilePage = ({ navigation, setIsAuthenticated }: any) => {
  const navHandler = () => {
    navigation.navigate("Counter");
  };

  const logoutHandler = () => {
    // Assuming you have a function to handle logout
    // You can perform any necessary cleanup here
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.mainContainer}>
      <Text>Hello TO THE NEW Profile PAGE</Text>
      <View style={styles.buttonContainer}>
        <Button title="BACK" onPress={navHandler} style={styles.buttonLeft} />
        <Button title="Logout" onPress={logoutHandler} style={styles.buttonRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counterContainer: {
    fontWeight: "700",
    color: "red",
    height: 40,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonLeft: {
    height: 30,
    width: 60,
  },
  buttonRight: {
    height: 30,
    width: 60,
  },
});

export default ProfilePage;
