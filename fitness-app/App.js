import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginNav from "./components/screens/login/LoginNav";
import TabsScreen from "./components/screens/TabsScreen";
import HeaderScreen from "./components/screens/HeaderScreen";
import React, { useReducer, useEffect } from "react";
import { IconButton } from "react-native-paper";
import GlobalContext from "./Context";
import { Datos, reducer } from "./reducer";
import { getExercises } from "./helpers/fitnessApi";
import MainScreen from "./components/screens/MainScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, Datos);

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((data) => {
        if (data) {
          const jsonData = JSON.parse(data);
          dispatch({
            type: "LOGIN",
            payload: { email: jsonData.email, token: jsonData.token },
          });
        }
      })
      .catch((message) => {
        console.log(message);
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Login' component={LoginNav} />
          <Stack.Screen name='childNav' component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
