import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginNav from "./components/screens/login/LoginNav";
import TabsScreen from "./components/screens/TabsScreen";
import React, { useReducer, useEffect } from "react";
import GlobalContext from "./Context";
import { Datos, reducer } from "./reducer";
import { getExercises } from "./helpers/fitnessApi";

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
        } else {
          throw "";
        }
      })
      .then(() => {
        dispatch({ type: "STORE_EXERCISES", payload: getExercises() });
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
          <Stack.Screen name='childNav' component={TabsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
