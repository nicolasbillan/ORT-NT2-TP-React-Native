import React from "react";
import { Provider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../../../styles";
import HomeScreen from "./HomeScreen";
import ExerciseDetailsScreen from "../details/ExerciseDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='DetailsScreen' component={ExerciseDetailsScreen} />
    </Stack.Navigator>
  );
}
