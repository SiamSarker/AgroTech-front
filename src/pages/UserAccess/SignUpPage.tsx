import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { Alert } from "react-native";

type SignUpPageProps = {
  navigation: any; // Navigation prop for navigating between screens
};

const SignUpPage: React.FC<SignUpPageProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("buyer"); // Default role

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.110:3000/user/create",
        {
          email, username, password, phone, address, role,
        }
      );

      console.log("Sign Up Successful:", response.data);

      Alert.alert("Success", "Sign Up Successful", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error: any) {
      console.error("Sign Up Failed:", error.message);
      Alert.alert("Error", "Sign Up Failed. Please try again.");
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

      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#888"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      {/* Role Selection */}
      <Text style={styles.roleText}>Select Role:</Text>
      <View style={styles.roleRadioContainer}>
        <RadioButton.Android
          value="buyer"
          color="green"
          status={role === "buyer" ? "checked" : "unchecked"}
          onPress={() => setRole("buyer")}
        />
        <Text style={styles.roleLabelText}>Buyer</Text>

        <RadioButton.Android
          value="farmer"
          color="green"
          status={role === "farmer" ? "checked" : "unchecked"}
          onPress={() => setRole("farmer")}
        />
        <Text style={styles.roleLabelText}>Farmer</Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{ marginBottom: 15 }} />

      {/* Back to Login Page Button */}
      <Text style={styles.roleText}>Already have an account?</Text>
      <TouchableOpacity
        style={styles.backToLoginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.backToLoginButtonText}>Back to Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // White background
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
  roleText: {
    color: "black",
    marginBottom: 10,
  },
  roleRadioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  roleLabelText: {
    marginLeft: 10,
    color: "black",
    fontSize: 16,
  },
  backToLoginButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  backToLoginButtonText: {
    color: "green",
    fontSize: 16,
  },
});

export default SignUpPage;
