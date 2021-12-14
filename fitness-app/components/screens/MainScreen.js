import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsScreen from "./TabsScreen";
import ExerciseDetailsScreen from "./details/ExerciseDetailsScreen";

const Stack = createStackNavigator();

export default function MainScreen() {
  return (
    <Stack.Navigator
      initialRouteName='TabsScreen'
      screenOptions={{
        headerShown: true,
        title: "FitnessApp",
        headerStyle: {
          backgroundColor: "#6200ee",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name='TabsScreen' component={TabsScreen} />
      <Stack.Screen name='DetailsScreen' component={ExerciseDetailsScreen} />
    </Stack.Navigator>
  );
}
