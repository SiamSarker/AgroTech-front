import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, RouteProp } from "@react-navigation/native";

interface CreateProductPageProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

const CreateProductPage: React.FC<CreateProductPageProps> = ({ navigation, route }) => {
  const [productName, setProductName] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [unit, setUnit] = useState<string>("kg");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUser(userData);
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const createProduct = async () => {
    try {
      const response = await Axios.post("http://192.168.0.110:3000/products", {
        name: productName,
        img_path: imagePath,
        available_quantity: quantity,
        unit: unit,
        price: price,
        farmer_id: user?.id,
      });

      Alert.alert("Product created successfully");
      route.params?.updateProducts && route.params?.updateProducts();
      navigation.goBack();
    } catch (error: any) {
      console.error("Error creating product:", error.message);
      Alert.alert("Error creating product", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Create Product</Text>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />

      <Text style={styles.label}>Image Path</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter image path"
        value={imagePath}
        onChangeText={(text) => setImagePath(text)}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Unit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter unit (e.g., kg)"
        value={unit}
        onChangeText={(text) => setUnit(text)}
      />

      <TouchableOpacity style={styles.button} onPress={createProduct}>
        <Text style={styles.buttonText}>Create Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  sectionTitle: {
    color: "#00cc00",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 40,
    marginTop: 40,
  },
  label: {
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#00cc00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateProductPage;
