import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductsPage from "./src/pages/Products/ProductsPage";
import BidRoomPage from "./src/pages/BidRoom/BidRoomPage";
import NationalizePage from "./src/pages/NationalizePage";
import ProfilePage from "./src/pages/Profile/ProfilePage";
import LoginPage from "./src/pages/UserAccess/LoginPage";
import SignUpPage from "./src/pages/UserAccess/SignUpPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          setIsAuthenticated(true);
        }
      } catch (error: any) {
        console.error('Error checking user authentication:', error.message);
      }
    };

    checkUserAuthentication();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <BottomTab.Navigator>
          <BottomTab.Screen name="Products" component={ProductsPage} />
          <BottomTab.Screen name="Bid Room" component={BidRoomPage} />
          <BottomTab.Screen name="Cart" component={NationalizePage} />
          <BottomTab.Screen 
            name="Profile" 
            component={(props: any) => (
              <ProfilePage {...props} setIsAuthenticated={setIsAuthenticated}/>
            )} 
          />
        </BottomTab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={(props: any) => (
              <LoginPage {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Stack.Screen name="SignUp" component={SignUpPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
