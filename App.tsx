import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductsPage from "./src/pages/Products/ProductsPage";
import CreateProductPage from "./src/pages/Products/CreateProductPage";
import BidRoomPage from "./src/pages/BidRoom/BidRoomPage";
import NationalizePage from "./src/pages/NationalizePage";
import ProfilePage from "./src/pages/Profile/ProfilePage";
import LoginPage from "./src/pages/UserAccess/LoginPage";
import SignUpPage from "./src/pages/UserAccess/SignUpPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProductsStack = createStackNavigator();

const ProductsStackScreen = () => (
  <ProductsStack.Navigator screenOptions={{ headerShown: false }}>
    <ProductsStack.Screen name="Products" component={ProductsPage} />
    {/* <ProductsStack.Screen name="ProductDetails" component={ProductDetailsPage} /> */}
    <ProductsStack.Screen name="CreateProduct" component={CreateProductPage} />
    {/* Add more screens as needed */}
  </ProductsStack.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <BottomTab.Navigator
          screenOptions={{ headerShown: false }}
        >
          <BottomTab.Screen name="Products" component={ProductsStackScreen} />
          <BottomTab.Screen name="Bid Room" component={BidRoomPage} />
          <BottomTab.Screen name="Cart" component={NationalizePage} />
          <BottomTab.Screen name="Profile">
            {(props) => <ProfilePage {...props} setIsAuthenticated={setIsAuthenticated} />}
          </BottomTab.Screen>
        </BottomTab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login">
            {(props) => <LoginPage {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUpPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
