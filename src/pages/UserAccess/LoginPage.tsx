import React, { useState } from "react";
import { Alert } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type LoginPageProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
  setIsAuthenticated: (value: boolean) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({
  navigation,
  setIsAuthenticated,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

        if (!email || !password) {
            console.error('Email and password are required');
            // You might want to display an error message to the user
            Alert.alert('Error', 'Email and password are required');
            return;
          }

        const response = await axios.post('http://localhost:3000/user/login', {
            email,
            password,
          });
      
          const userData = response.data;
      
          if (userData && userData.id && userData.username && userData.email) {
            console.log('Login successful!');
            console.log('User Data:', userData);

            const userDataToStore = {
                username: userData?.username,
                email: userData?.email,
                role: userData?.role,
                phone: userData?.phone,
                address: userData?.address,
              };
      
            // Store user data in local storage
            await AsyncStorage.setItem('userData', JSON.stringify(userDataToStore));
      
            setIsAuthenticated(true);
    
          } else {
            console.error('Login failed. Invalid response format.');
            Alert.alert('Error', 'Login failed. Invalid email and password.');
          }
    } catch (error: any) {
      console.error("Error during login:", error.message);
      Alert.alert('Error', 'Error during login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Sample Logo */}
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_pgM83QCuGt28zGxLoi1EtOKq0UfegvRdAvndqSJ-bkT-o3jlQ8KY414f0OCRxrj3PrE&usqp=CAU",
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Buyer Login */}
      <Text style={styles.title}>User Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "red" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <br />
      {/* Create Account Section */}
      <Text style={styles.createAccountText}>Do not have an account?</Text>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Home View Button */}
      <TouchableOpacity
        style={styles.homeViewButton}
        onPress={() => setIsAuthenticated(true)}
      >
        <Text style={styles.homeViewButtonText}>Home View</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: "green",
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    width: "80%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  createAccountText: {
    color: "black",
    marginBottom: 10,
  },
  createAccountButton: {
    marginBottom: 20,
  },
  createAccountButtonText: {
    color: "green",
  },
  farmerLoginText: {
    color: "black",
    marginBottom: 10,
  },
  farmerLoginButton: {
    marginBottom: 20,
  },
  farmerLoginButtonText: {
    color: "green",
  },
  homeViewButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  homeViewButtonText: {
    color: "white",
  },
});

export default LoginPage;
