import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CounterPage from "./src/pages/CounterPage";
import LoginPage from "./src/pages/LoginPage";
import SettingsPage from "./src/pages/SettingPage";
import NationalizePage from "./src/pages/NationalizePage";
import ProfilePage from "./src/pages/Profile/ProfilePage";
import UserAccessScreen from "./src/pages/UserAccess/UserAccessScreen";
import ProductsPage from "./src/pages/Products/ProductsPage";
import { Button, View } from "react-native";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const AuthStack = createStackNavigator();

// AuthFlow component
type AuthFlowProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthFlow: React.FC<AuthFlowProps> = ({ setIsAuthenticated }) => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name='Login' component={LoginPage} />
  </AuthStack.Navigator>
);

// BasicDashboardScreen component
type BasicDashboardScreenProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const BasicDashboardScreen: React.FC<BasicDashboardScreenProps> = ({ setIsAuthenticated }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Products' component={ProductsPage} />
    <Stack.Screen name='Profile' component={ProfilePage} />
    <Stack.Screen name='Counter' component={CounterPage} />
    <Stack.Screen name='AuthFlow' component={AuthFlow} options={{ headerShown: true, title: 'Login' }} />
  </Stack.Navigator>
);

// ProfilePage component
type ProfilePageProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {isAuthenticated ? (
          <BottomTab.Navigator
            screenOptions={{ headerShown: false }}
            tabBarOptions={{
              activeTintColor: 'green',
              inactiveTintColor: 'red',
              style: { backgroundColor: '#f2f2f2' },
            }}
          >
            <BottomTab.Screen name="Products" children={() => <BasicDashboardScreen setIsAuthenticated={setIsAuthenticated} />} />
            <BottomTab.Screen name="Bid Room" component={SettingsPage} />
            <BottomTab.Screen name="Cart" component={NationalizePage} />
            <BottomTab.Screen name="Profile" children={() => <ProfilePage setIsAuthenticated={setIsAuthenticated} />} />
          </BottomTab.Navigator>
        ) : (
          <UserAccessScreen setIsAuthenticated={setIsAuthenticated}/>
        )}
      </NavigationContainer>

    </View>
  );
};

export default App;
