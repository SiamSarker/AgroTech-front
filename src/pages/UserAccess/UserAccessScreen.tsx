import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const UserAccessScreen = ({ setIsAuthenticated }) => {
  return (
    <View style={styles.container}>
      {/* Sample Logo */}
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_pgM83QCuGt28zGxLoi1EtOKq0UfegvRdAvndqSJ-bkT-o3jlQ8KY414f0OCRxrj3PrE&usqp=CAU' }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Buyer Login */}
      <Text style={styles.title}>Buyer Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'red' }]}
        // onPress={() => /* Add your login logic here */}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Create Account Section */}
      <Text style={styles.createAccountText}>Do not have an account?</Text>
      <TouchableOpacity
        style={styles.createAccountButton}
        // onPress={() => /* Add your create account logic here */}
      >
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Farmer Login Section */}
      <Text style={styles.farmerLoginText}>Are you a farmer?</Text>
      <TouchableOpacity
        style={styles.farmerLoginButton}
        // onPress={() => /* Add your farmer login logic here */}
      >
        <Text style={styles.farmerLoginButtonText}>Farmer Login</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: 'green',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  createAccountText: {
    color: 'black',
    marginBottom: 10,
  },
  createAccountButton: {
    marginBottom: 20,
  },
  createAccountButtonText: {
    color: 'green',
  },
  farmerLoginText: {
    color: 'black',
    marginBottom: 10,
  },
  farmerLoginButton: {
    marginBottom: 20,
  },
  farmerLoginButtonText: {
    color: 'green',
  },
  homeViewButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  homeViewButtonText: {
    color: 'white',
  },
});

export default UserAccessScreen;
