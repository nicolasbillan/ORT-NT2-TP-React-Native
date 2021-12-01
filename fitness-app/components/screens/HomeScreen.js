import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { styles } from "../../styles";
import { Datos, reducer } from "../../reducer";
import { getExercises } from "../../helpers/fitnessApi";

export default function App() {
  const [state, dispatch] = useReducer(reducer, Datos);

  useEffect(() => {
    AsyncStorage.getItem("excercises")
      .then((data) => {
        if (!data) {
          return getExercises();
        }
      })
      .then((data) => {
        dispatch({ type: "STORE_EXERCISES", payload: data });
      })
      .catch((message) => {
        console.log(message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>WELCOME</Text>
    </View>
  );
}
