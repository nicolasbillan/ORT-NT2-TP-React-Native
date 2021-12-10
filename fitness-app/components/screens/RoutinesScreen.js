import React, { useEffect, useState, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getRoutinesForUser } from "../../helpers/fitnessApi";
import { styles } from "../../styles";
import { Datos, reducer } from "../../reducer";

export default function App() {
  const [state, dispatch] = useReducer(reducer, Datos);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("routines")
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        }
        AsyncStorage.getItem("token").then((userData) => {
          if (userData) {
            const jsonData = JSON.parse(userData);
            getRoutinesForUser(jsonData.userId);
            dispatch({
              type: "LOGIN",
              payload: { userId: jsonData.userId, email: jsonData.email, token: jsonData.token },
            });
          }
        });       
      })
      .then((data) => {
        dispatch({ type: "STORE_ROUTINES", payload: { routines: data } });
      })
      .then(() => setRoutines(Datos.routines))
      .catch((message) => {
        dispatch({ type: "LOGOUT" });
        navigation.navigate("Login");
        console.log(message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>ROUTINES</Text>
    </View>
  );
}
