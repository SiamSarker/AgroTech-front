import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import productsData from "/Users/siamsarker/Documents/projects/AgroTech-front/assets/data/products.json";
import { useNavigation } from "@react-navigation/native";
import CreateProductPage from "./CreateProductPage";
import Axios from "axios";

const defaultUser = {
  username: "Default User",
  role: "default",
};

const defaultProduct = [
  {
      "id": 2,
      "name": "Default",
      "img_path": "path/to/image.jpg",
      "available_quantity": 100,
      "unit": "kg",
      "price": "25.99",
      "created_at": "2023-12-07T20:40:36.895Z",
      "updated_at": "2023-12-07T20:40:36.895Z",
      "farmer_id": null
  }
];

type ProductsPageProps = {
  navigation: any; 
};
  
const ProductsPage: React.FC<ProductsPageProps> = ({ navigation }) => {
  const [products, setProducts] = useState(defaultProduct);
  const [user, setUser] = useState(defaultUser);

  const updateProducts = async () => {
    try {
      const response = await Axios.get("http://192.168.0.110:3000/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
    }
  };

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

    const fetchProducts = async () => {
      try {
        const response = await Axios.get("http://192.168.0.110:3000/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (error: any) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchUserData();
    fetchProducts();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("CreateProduct")}
          title="Create Product"
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://miro.medium.com/v2/resize:fit:2400/2*2TXYxlwIpt5W_5RgDvvT5w.jpeg",
          }}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user?.username}</Text>
          <Text style={styles.userType}>{user?.role}</Text>
        </View>
      </View>

      <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Products</Text>
        <Button
          title="Create Product"
          onPress={() => navigation.navigate("CreateProduct", { updateProducts })}
        />
        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.productBox}
            // onPress={() => console.log(`Product ${index + 1} pressed`)}
            onPress={() => navigation.navigate("ProductDetails", { product: product })}
          >
            <View style={styles.productImageContainer}>
              <Image
                source={{ uri: product.img_path }}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productInfoTextBold}>Name: {product?.name}</Text>
              <Text>Available Quantity: {product?.available_quantity}</Text>
              <Text>Price: {product?.price}</Text>
              <Text>Added In: {product?.created_at}</Text>
              <Text>Farmer Name: {product?.farmer_id}</Text>
              <Button
                title="Add to Cart"
                color="red"
                onPress={() => navigation.navigate("ProductDetails", { product: product })}
              />
            </View>
          </TouchableOpacity>
        ))}
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "#ffffff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.36,
    shadowRadius: 3.68,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  userInfoContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    flex: 1,
  },
  userName: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 16,
  },
  userType: {
    color: "#666666",
    fontSize: 14,
  },
  productsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#00cc00",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  productBox: {
    flexDirection: "row",
    marginBottom: 5,
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
  productImageContainer: {
    flex: 4,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  productInfoContainer: {
    flex: 6,
    marginLeft: 10,
  },
  productInfoTextBold: {
    fontWeight: "bold",
  },
});

export default ProductsPage;
