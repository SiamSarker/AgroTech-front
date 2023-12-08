import React from "react";
import { View, Text, Image, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import Axios from "axios";

// Define the Product interface
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

// Define the ProductDetailsPageProps interface
interface ProductDetailsPageProps {
    navigation: NavigationProp<any>;
    route: RouteProp<{ params: { product: Product, updateProducts: () => void } }, "params">;
  }


const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ navigation, route }) => {
  const { product } = route.params;

  const handleDeleteProduct = async () => {
    try {
        console.log( product.id );
      // Make a DELETE request to your API
      await Axios.delete(`http://192.168.0.110:3000/products/${product.id}`);

      route.params?.updateProducts && route.params?.updateProducts();

      // Display success message
      Alert.alert("Success", "Product deleted successfully");
      
      // Navigate back to ProductsPage
      navigation.goBack();
    } catch (error: any) {
      console.error("Error deleting product:", error.message);
      // Handle error, display error message, etc.
      Alert.alert("Error", "Failed to delete product");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.img_path }} style={styles.productImage} resizeMode="cover" />
      </View>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productInfoTextBold}>Name: {product.name}</Text>
        <Text>Available Quantity: {product.available_quantity}</Text>
        <Text>Price: {product.price}</Text>
        <Text>Added In: {product.created_at}</Text>
        <Text>Farmer Name: {product.farmer_id}</Text>
        {/* Add more details or actions as needed */}
        <Button title="Edit" 
        // onPress={() => /* Navigate to Edit screen */} 
        />
        <Button title="Delete" 
            onPress={handleDeleteProduct} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  productImageContainer: {
    flex: 4,
  },
  productImage: {
    width: "100%",
    height: 300, // Adjust the height as needed
    borderRadius: 5,
  },
  productInfoContainer: {
    flex: 6,
    marginTop: 20,
  },
  productInfoTextBold: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProductDetailsPage;
