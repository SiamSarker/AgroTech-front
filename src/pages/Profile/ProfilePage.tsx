import React from "react";
import { Button, Image, Text, View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = ({ navigation, setIsAuthenticated }: any) => {
  const navHandler = () => {
    navigation.navigate("Counter");
  };

  const logoutHandler = async ()  => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userData');
      setIsAuthenticated(false);

    } catch (error: any) {
      console.error('Error clearing user data from AsyncStorage:', error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Picture in top middle */}
      <Image
        source={{ uri: 'https://miro.medium.com/v2/resize:fit:2400/2*2TXYxlwIpt5W_5RgDvvT5w.jpeg' }}
        style={styles.profileImage}
        resizeMode="cover"
      />

      {/* Name and Buyer Info */}
      <Text style={styles.nameText}>Siam Sarker</Text>
      <Text style={styles.buyerText}>Buyer</Text>

      {/* Contact Info */}
      <Text style={styles.contactText}>+88018xxxxxxxx50</Text>
      <Text style={styles.contactText}>sarkersiam2@gmail.com</Text>
      <Text style={styles.contactText}>Daudkandi, Comilla</Text>

      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={logoutHandler} color="green" />
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  buyerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
  logoutButtonContainer: {
    marginTop: 20,
  },
});

export default ProfilePage;
