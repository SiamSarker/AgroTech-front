import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import Axios from "axios";
import { NavigationProp, RouteProp } from "@react-navigation/native";

interface Product {
  id: number;
  name: string;
  img_path: string;
  available_quantity: number;
  unit: string;
  price: string;
  created_at: string;
  updated_at: string;
  farmer_id: number | null;
}

interface EditProductPageProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { product: Product; updateProducts: () => void } }, "params">;
}

const EditProductPage: React.FC<EditProductPageProps> = ({ navigation, route }) => {
  const { product, updateProducts } = route.params;
  const [productName, setProductName] = useState<string>(product.name);
  const [imagePath, setImagePath] = useState<string>(product.img_path);
  const [quantity, setQuantity] = useState<string>(product.available_quantity.toString());
  const [price, setPrice] = useState<string>(product.price);
  const [farmerId, setFarmerId] = useState<number | null>(product.farmer_id);

  const handleUpdate = async () => {
    try {
      const response = await Axios.put(`http://192.168.0.110:3000/products/${product.id}`, {
        name: productName,
        img_path: imagePath,
        available_quantity: parseInt(quantity, 10),
        unit: "kg", // Assuming 'unit' is always in kilograms
        price: price,
        farmer_id: farmerId,
      });

      Alert.alert("Success", "Product updated successfully", [
        { text: "OK", onPress: () => handleSuccessUpdate() },
      ]);
      
    } catch (error: any) {
      console.error("Error updating product:", error.message);
      Alert.alert("Error updating product", error.message);
    }
  };

  const handleSuccessUpdate = () => {
    updateProducts();
    navigation.navigate("Products");
    // Optionally, you can navigate to ProductDetailsPage if needed
    // navigation.navigate("ProductDetails", { product: updatedProduct, updateProducts });
  };

  useEffect(() => {
    // Set header options
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleUpdate} title="Update" color="#00cc00" />
      ),
    });
  }, [navigation, handleUpdate]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Edit Product</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Image Path</Text>
        <TextInput
          style={styles.input}
          placeholder="Image Path"
          value={imagePath}
          onChangeText={(text) => setImagePath(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Farmer ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Farmer ID"
          value={farmerId?.toString() || ""}
          onChangeText={(text) => setFarmerId(parseInt(text, 10))}
          keyboardType="numeric"
        />
      </View>
      <Button onPress={handleUpdate} title="Update" color="#00cc00" />
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
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default EditProductPage;
