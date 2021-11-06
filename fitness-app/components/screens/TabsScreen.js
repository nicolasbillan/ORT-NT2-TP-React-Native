import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeScreen from "./HomeScreen";
import styles from "../../styles";

const Tab = createBottomTabNavigator();

function homeIcon() {
  return (
    <Image
      style={styles["tab-icon"]}
      source={require("../../assets/home.png")}
    ></Image>
  );
}

export default function App() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
      ></Tab.Screen>
      <Tab.Screen name='Routines' component={HomeScreen}></Tab.Screen>
      <Tab.Screen name='Favorites' component={HomeScreen}></Tab.Screen>
      <Tab.Screen name='Preferences' component={HomeScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}
