import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Axios from "axios";

interface CartItem {
  id: number;
  product_id: number;
  buyer_id: number;
  selected_quantity: number;
  total_price: string;
  status: string;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    name: string;
    img_path: string;
    available_quantity: number;
    unit: string;
    price: string;
    created_at: string;
    updated_at: string;
    farmer_id: number | null;
  };
}

type CartPageProps = {
  navigation: any;
};

const CartPage: React.FC<CartPageProps> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await Axios.get("http://192.168.0.110:3000/cart");
        console.log(response.data);
        setCartItems(response.data);
      } catch (error: any) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Shopping Cart</Text>
      {cartItems.map((item) => (
        <View key={item.id} style={styles.cartItemContainer}>
          <Image 
          source={{
            uri:
              item.product.img_path === 'tomato'
                ? 'https://www.collinsdictionary.com/images/full/tomato_281240360.jpg'
                : item.product.img_path === 'potato'
                ? 'https://farmfreshbangalore.com/cdn/shop/products/i6i3gdx_1500x.jpg?v=1647265311'
                : 'https://mzfoodtest.com/wp-content/uploads/2022/04/1-3.jpg',
          }}
          style={styles.productImage} resizeMode="cover" />
          <View style={styles.productInfoContainer}>
            <Text style={styles.productName}>{item.product.name}</Text>
            <Text>Quantity: {item.selected_quantity}</Text>
            <Text>Total Price: {item.total_price} USD</Text>
            <Text>Purchase Date: {item.created_at}</Text>
            <Text style={{ fontWeight: "bold", color: getStatusColor(item.status) }}>{item.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "orange";
    // Add more cases for other statuses if needed
    default:
      return "black";
  }
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
  cartItemContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productInfoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartPage;
