import React, { useEffect, useState } from "react";
import { Button, Image, Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";

import bidRoomJson from "/Users/siamsarker/Documents/projects/AgroTech-front/assets/data/bidRoomData.json";

const BidRoomPage = (props: any) => {
  const [bidRoomData, setBidRoomData] = useState(bidRoomJson);

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

      {/* Bid Room Section */}
      <View style={styles.bidRoomContainer}>
        <Text style={styles.sectionTitle}>Bid Room</Text>

        {/* Bid Room Boxes */}
        {/* Dynamically render bid room boxes based on the loaded data */}
        {bidRoomData.map((bidRoom, index) => (
          <TouchableOpacity
            key={index}
            style={styles.bidRoomBox}
            // onPress={() => /* Handle press, e.g., navigate to bid details */}
          >
            <View style={styles.bidRoomImageContainer}>
              {/* Bid Room Image (Add your actual bid room image source) */}
              <Image
                source={{ uri: bidRoom.imageUri }}
                style={styles.bidRoomImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.bidRoomInfoContainer}>
              <Text style={styles.bidRoomInfoTextBold}>Name: {bidRoom.name}</Text>
              <Text style={styles.bidRoomInfoText}>Available Quantity: {bidRoom.quantity}</Text>
              <Text style={styles.bidRoomInfoText}>Minimum Quantity: {bidRoom.minQuantity}</Text>
              <Text style={styles.bidRoomInfoText}>Starting Price: {bidRoom.price}</Text>
              <Text style={styles.bidRoomInfoText}>Bid Starts: {bidRoom.bidStarts}</Text>
              <Text style={styles.bidRoomInfoText}>Bid Ends: {bidRoom.bidEnds}</Text>
              {/* <Text style={styles.bidRoomInfoText}>Farmer Name: {bidRoom.farmerName}</Text> */}
              <TouchableOpacity
                style={styles.bidNowButton}
                // onPress={() => /* Handle press, e.g., bid now */}
              >
                <Text style={styles.bidNowButtonText}>Bid Now</Text>
              </TouchableOpacity>
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
  bidRoomContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  bidRoomBox: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5, // Android shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bidRoomImageContainer: {
    flex: 4,
  },
  bidRoomImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  bidRoomInfoContainer: {
    flex: 6,
    marginLeft: 10,
    padding: 10,
  },
  bidRoomInfoText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  bidRoomInfoTextBold: {
    fontWeight: 'bold',
  },
  bidNowButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bidNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BidRoomPage;
