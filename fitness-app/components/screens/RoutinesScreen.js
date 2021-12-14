import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useReducer } from "react";
import { FlatList, View } from "react-native";
import { styles } from "../../styles";
import { Datos, reducer } from "../../reducer";
import RoutinePreview from "../elements/routines/Preview";
import { ScrollView } from "react-native-gesture-handler";

export default function App({ ...props }) {
  const { navigation } = props;
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
        let auxEx = Datos.exercises;
        let auxExIdx = auxEx.reduce((a, x) => ({ ...a, [x._id]: x }), {});
        let auxRout = data;
        auxRout.forEach((r) =>
          r.ejercicios.forEach((e, i, ar) => (ar[i] = auxExIdx[e]))
        );
        return auxRout;
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
