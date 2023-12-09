import React from "react";
import { View, Text, Image, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
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
      console.log(product.id);
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

  const handleEditProduct = (product: Product) => {
    navigation.navigate("EditProduct", { product, updateProducts: route.params.updateProducts });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Product Details</Text>

      <View style={styles.productImageContainer}>
        <Image
          source={{
            uri:
              product.img_path === "tomato"
                ? "https://www.collinsdictionary.com/images/full/tomato_281240360.jpg"
                : product.img_path === "potato"
                ? "https://farmfreshbangalore.com/cdn/shop/products/i6i3gdx_1500x.jpg?v=1647265311"
                : "https://mzfoodtest.com/wp-content/uploads/2022/04/1-3.jpg",
          }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productInfoTextBold}>Name: {product.name}</Text>
        <Text style={styles.productInfoText}>Available Quantity: {product.available_quantity}</Text>
        <Text style={styles.productInfoText}>Price: {product.price}</Text>
        <Text style={styles.productInfoText}>Added In: {product.created_at}</Text>
        
        {/* Add more details or actions as needed */}
        {/* <Button title="Edit" onPress={() => handleEditProduct(product)} />
        <Button title="Delete" onPress={handleDeleteProduct} /> */}

        <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditProduct(product)} // You can use other navigation functions here
      >
        <Text style={styles.editButtonText}>Edit Product</Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteProduct} // You can use other navigation functions here
      >
        <Text style={styles.deleteButtonText}>Delete Product</Text>
      </TouchableOpacity>
      </View>

      {/* Go Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // You can use other navigation functions here
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00cc00",
    marginBottom: 20,
    marginTop: 40,
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
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  productInfoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333",
  },

  backButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  editButton: {
    backgroundColor: "#00cc00",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

});

export default ProductDetailsPage;
