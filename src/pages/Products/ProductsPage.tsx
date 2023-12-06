import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Image, ScrollView } from "react-native";
import axios from "axios";

import productsData from "/Users/siamsarker/Documents/projects/AgroTech-front/assets/data/products.json";

const ProductsPage = (props: any) => {

    const [products, setProducts] = useState(productsData);

  return (
    <ScrollView style={styles.container}>

       

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {/* Profile Picture (Add your actual profile picture source) */}
        <Image
          source={{ uri: 'https://miro.medium.com/v2/resize:fit:2400/2*2TXYxlwIpt5W_5RgDvvT5w.jpeg' }}
          style={styles.profileImage}
          resizeMode="cover"
        />

        {/* User Information */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Siam Sarker</Text>
          <Text style={styles.userType}>Buyer</Text>
        </View>

        {/* Logo (Add your actual logo source) */}
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_pgM83QCuGt28zGxLoi1EtOKq0UfegvRdAvndqSJ-bkT-o3jlQ8KY414f0OCRxrj3PrE&usqp=CAU' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

       {/* Products Section */}
       <View style={styles.productsContainer}>
        <Text style={styles.sectionTitle}>Products</Text>

      {/* Product Boxes */}
        {/* Dynamically render product boxes based on the loaded data */}
        {products.map((product, index) => (
          <View style={styles.productBox} key={index}>
            <View style={styles.productImageContainer}>
              {/* Product Image (Add your actual product image source) */}
              <Image
                source={{ uri: product.imageUri }}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productInfoTextBold}>Name: {product.name}</Text>
              <Text style={styles.productInfoTextBold}>Available Quantity: {product.quantity}</Text>
              <Text style={styles.productInfoTextBold}>Price: {product.price}</Text>
              <Text style={styles.productInfoTextBold}>Added In: {product.addedIn}</Text>
              <Text style={styles.productInfoTextBold}>Farmer Name: {product.farmerName}</Text>
              <Button
                title="Add to Cart"
                color="red"
                // onPress={() => /* Add to cart logic */}
              />
            </View>
          </View>
        ))}

    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoContainer: {
    marginLeft: 10,
  },
  userName: {
    color: 'black',
    fontWeight: 'bold',
  },
  userType: {
    color: 'black',
  },
  logo: {
    width: 50,
    height: 50,
  },
  productsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  productBox: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImageContainer: {
    flex: 4,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  productInfoContainer: {
    flex: 6,
    marginLeft: 10,
  },
  productInfoTextBold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ProductsPage;
