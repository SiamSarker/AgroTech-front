import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const defaultUser = {
  username: "Default User",
  role: "default",
};

const defaultProduct = [
  {
    "id": 2,
    "name": "Default",
    "img_path": "tomato",
    "available_quantity": 32,
    "unit": "kg",
    "price": 34.3,
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
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateProduct", { updateProducts })}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>Create Product</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
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
        {user?.role === 'farmer' && (
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateProduct", { updateProducts })}
            style={styles.createProductButton}
          >
            <Text style={styles.createProductButtonText}>Create Product</Text>
          </TouchableOpacity>
        )}
        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.productBox}
            onPress={() => {
              const screen = user?.role === 'buyer' ? "BuyProduct" : "ProductDetails";
              navigation.navigate(screen, { product, updateProducts });
            }}
          >
            <View style={styles.productImageContainer}>
              <Image
                source={{
                  uri: getImageUrl(product.img_path),
                }}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productInfoTextBold}>Name: {product?.name}</Text>
              <Text>Available Quantity: {product?.available_quantity}</Text>
              <Text>Price: {product?.price}</Text>
              <Text>Added In: {product?.created_at}</Text>

              <TouchableOpacity
              style={styles.buyButton}
              onPress={() => navigation.navigate(user?.role === 'buyer' ? "BuyProduct" : "ProductDetails", { product, updateProducts })}
            >
              <Text style={styles.buyButtonText}>{user?.role === 'buyer' ? 'Buy Product' : 'Details'}</Text>
            </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const getImageUrl = (imgPath: string) => {
  switch (imgPath) {
    case 'tomato':
      return 'https://www.collinsdictionary.com/images/full/tomato_281240360.jpg';
    case 'potato':
      return 'https://farmfreshbangalore.com/cdn/shop/products/i6i3gdx_1500x.jpg?v=1647265311';
    default:
      return 'https://mzfoodtest.com/wp-content/uploads/2022/04/1-3.jpg';
  }
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
  createProductButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  createProductButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  productBox: {
    flexDirection: "row",
    marginBottom: 15,
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
  buyButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerButton: {
    marginRight: 10,
  },
  headerButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
});

export default ProductsPage;
