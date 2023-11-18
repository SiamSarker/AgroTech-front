import React from "react";
import CounterPage from "./src/pages/CounterPage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from "./src/pages/LoginPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsPage from "./src/pages/SettingPage";
import NationalizePage from "./src/pages/NationalizePage";

const stack = createStackNavigator();
const bottom_tab = createBottomTabNavigator();

const BasicDashboardScreen = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name='Counter' component={CounterPage}></stack.Screen>
      <stack.Screen name='Login' component={LoginPage}></stack.Screen>
    </stack.Navigator>
  )
};

const App = () => {
return(
  
  <NavigationContainer>
    <bottom_tab.Navigator>
      <bottom_tab.Screen name="Dashboard" component={BasicDashboardScreen}></bottom_tab.Screen>
      <bottom_tab.Screen name="Setting" component={SettingsPage}></bottom_tab.Screen>
      <bottom_tab.Screen name="Nationalize" component={NationalizePage}></bottom_tab.Screen>
    </bottom_tab.Navigator>
  </NavigationContainer>
)
}

export default App;