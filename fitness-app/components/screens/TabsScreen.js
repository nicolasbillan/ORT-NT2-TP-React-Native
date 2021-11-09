import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import RoutinesScreen from "./RoutinesScreen";
import PreferencesScreen from "./PreferencesScreen";
import FavoritesScreen from "./FavoritesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
      <Tab.Screen name='Routines' component={RoutinesScreen}></Tab.Screen>
      <Tab.Screen name='Favorites' component={FavoritesScreen}></Tab.Screen>
      <Tab.Screen name='Preferences' component={PreferencesScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}
