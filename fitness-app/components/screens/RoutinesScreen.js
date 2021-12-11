import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useReducer } from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "../../styles";
import { Datos, reducer } from "../../reducer";
import RoutinePreview from "../elements/routines/Preview";
import { ScrollView } from "react-native-gesture-handler";
import TextInput from "../elements/TextInput";

export default function App({ navigation }) {
  const [state, dispatch] = useReducer(reducer, Datos);

  useEffect(() => {
    AsyncStorage.getItem("routines")
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        }
        throw "";
      })
      .then((data) => {
        if (data) {
          dispatch({ type: "STORE_ROUTINES", payload: { routines: data } });
        }
      })
      .catch((message) => {
        dispatch({ type: "LOGOUT" });
        navigation.navigate("Login");
        console.log(message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={Datos.routines}
          renderItem={RoutinePreview}
          keyExtractor={(item) => item.nombre}
        />
      </ScrollView>
    </View>
  );
}
