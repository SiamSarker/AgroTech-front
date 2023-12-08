import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import Axios from "axios";

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

interface BuyProductPageProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{ params: { product: Product; updateProducts: () => void } }, "params">;
}

const BuyProductPage: React.FC<BuyProductPageProps> = ({ navigation, route }) => {
  const { product, updateProducts } = route.params;
  const [quantity, setQuantity] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const handleQuantityChange = (text: string) => {
    setQuantity(text);

    // Recalculate total price whenever the quantity changes
    if (text !== "") {
      const calculatedTotalPrice = parseFloat(product.price) * parseInt(text, 10);
      setTotalPrice(calculatedTotalPrice);
    } else {
      // Clear total price if quantity is empty
      setTotalPrice(null);
    }
  };

  const handleConfirmPurchase = async () => {
    if (!quantity || isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0) {
      Alert.alert("Invalid Quantity", "Please enter a valid quantity.");
      return;
    }

    const calculatedTotalPrice = parseFloat(product.price) * parseInt(quantity, 10);
    setTotalPrice(calculatedTotalPrice);

    try {
      const response = await Axios.post("http://192.168.0.110:3000/cart", {
        product_id: product.id,
        buyer_id: 6, // Assuming buyer_id is fixed to 6
        selected_quantity: parseInt(quantity, 10),
        total_price: calculatedTotalPrice,
        status: "pending",
      });

      // After a successful purchase, you can update the products list.
      updateProducts();

      // Display success message and navigate to the products page
      Alert.alert("Purchase Confirmed", "Check status section.");
      navigation.navigate("Products");
    } catch (error: any) {
      console.error("Error confirming purchase:", error.message);
      Alert.alert("Error Confirming Purchase", "An error occurred while confirming the purchase. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Purchase Product</Text>
      <View style={styles.productImageContainer}>
        {/* <Image source={{ uri: product.img_path }} style={styles.productImage} resizeMode="cover" /> */}
      </View>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productInfoTextBold}>Name: {product.name}</Text>
        <Text>Available Quantity: {product.available_quantity}</Text>
        <Text>Price: {product.price}</Text>
        <Text>Unit: {product.unit}</Text>
        <Text>Farmer Name: {product.farmer_id}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Quantity:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
        />
      </View>
      {totalPrice !== null && (
        <View style={styles.totalPriceContainer}>
          <Text style={styles.label}>Total Price:</Text>
          <Text style={styles.totalPriceText}>{totalPrice.toFixed(2)} USD</Text>
        </View>
      )}
      <Button
        title="Confirm Purchase"
        onPress={handleConfirmPurchase}
        disabled={!quantity || isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0}
      />
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
  productImageContainer: {
    flex: 4,
  },
  productImage: {
    width: "100%",
    height: 300,
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
  quantityContainer: {
    marginTop: 20,
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
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  totalPriceContainer: {
    marginTop: 10,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default BuyProductPage;
