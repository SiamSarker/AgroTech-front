// CreateProductPage.tsx

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import Axios from "axios";
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
  const [farmerId, setFarmerId] = useState<number | undefined>(undefined); // Change to number type

  useEffect(() => {
    // Set header options
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("CreateProduct")}
          title="Create Product"
          color="#00cc00"
        />
      ),
    });
  }, [navigation]);

  const createProduct = async () => {
    try {
      const response = await Axios.post("http://192.168.0.110:3000/products", {
        name: productName,
        img_path: imagePath,
        available_quantity: quantity,
        unit: "kg", // Assuming 'unit' is always in kilograms
        price: price,
        farmer_id: farmerId,
      });

      // Display success message or navigate to another screen
      Alert.alert("Product created successfully");
      route.params?.updateProducts && route.params?.updateProducts();
      console.log(route.params);
      navigation.goBack();
    } catch (error: any) {
      console.error("Error creating product:", error.message);
      // Handle error, display error message, etc.
      Alert.alert("Error creating product", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Create Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Image Path"
        value={imagePath}
        onChangeText={(text) => setImagePath(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Farmer ID"
        value={farmerId?.toString() || ""}
        onChangeText={(text) => setFarmerId(parseInt(text, 10))}
        keyboardType="numeric"
      />
      <Button title="Create Product" onPress={createProduct} />
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
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CreateProductPage;

