import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import productsData from "/Users/siamsarker/Documents/projects/AgroTech-front/assets/data/products.json";

const defaultUser = {
  username: "Default User",
  email: "",
  role: "default",
  phone: "1234",
  address: "Dhaka",
};

const ProductsPage = (props: any) => {
  const [products, setProducts] = useState(productsData);
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUser(userData);
        }
      } catch (error: any) {
        console.error(
          "Error fetching user data from AsyncStorage:",
          error.message
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {/* Profile Picture */}
        <Image
          source={{
            uri:
              "https://miro.medium.com/v2/resize:fit:2400/2*2TXYxlwIpt5W_5RgDvvT5w.jpeg",
          }}
          style={styles.profileImage}
          resizeMode="cover"
        />

        {/* User Information */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user?.username}</Text>
          <Text style={styles.userType}>{user?.role}</Text>
        </View>

        {/* Logo */}
        <Image
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_pgM83QCuGt28zGxLoi1EtOKq0UfegvRdAvndqSJ-bkT-o3jlQ8KY414f0OCRxrj3PrE&usqp=CAU",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Products Section */}
      <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Products</Text>

        {/* Product Boxes */}
        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.productBox}
            onPress={() => console.log(`Product ${index + 1} pressed`)}
          >
            {/* Product Image */}
            <View style={styles.productImageContainer}>
              <Image
                source={{ uri: product.imageUri }}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>

            {/* Product Information */}
            <View style={styles.productInfoContainer}>
              <Text style={styles.productInfoTextBold}>Name: {product.name}</Text>
              <Text>Available Quantity: {product.quantity}</Text>
              <Text>Price: {product.price}</Text>
              <Text>Added In: {product.addedIn}</Text>
              <Text>Farmer Name: {product.farmerName}</Text>
              <Button
                title="Add to Cart"
                color="red"
                onPress={() =>
                  console.log(`Add to Cart pressed for Product ${index + 1}`)
                }
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
    backgroundColor: "#f5f5f5", // Light gray background
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#ffffff", // White background
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd", // Light gray border
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    color: "#333333", // Dark gray text
    fontWeight: "bold",
    fontSize: 16,
  },
  userType: {
    color: "#666666", // Medium gray text
    fontSize: 14,
  },
  logo: {
    width: 50,
    height: 50,
  },
  productsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: "#00cc00", // Green text
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  productBox: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#ffffff", // White background
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dddddd", // Light gray border
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
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
