import React, { useEffect, useState, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getRoutinesForUser } from "../../helpers/fitnessApi";
import { styles } from "../../styles";
import { Datos, reducer } from "../../reducer";
import RoutinePreview from "../elements/routines/Preview";
import TextInput from "../elements/TextInput";

export default function RoutinesScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, Datos);
  const [routines, setRoutines] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("routines")
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        }
        return AsyncStorage.getItem("token").then((userData) => {
          if (userData) {
            const jsonData = JSON.parse(userData);
            return getRoutinesForUser(jsonData.userId);
          } else {
            throw "";
          }
        });
      })
      .then((data) => {
        let auxEx = Datos.exercises;
        let auxExIdx = auxEx.reduce((a,x) => ({...a, [x._id]: x}), {});
        let auxRout = data;
        auxRout.forEach((r) =>
        r.ejercicios.forEach((e, i, ar) => 
          ar[i] = auxExIdx[e]));
        setRoutines(auxRout);
        return auxRout;
      }
      )
      .then((data) => {
        dispatch({ type: "STORE_ROUTINES", payload: { routines: data } });
      })
      .catch((message) => {
        dispatch({ type: "LOGOUT" });
        navigation.navigate("Login");
        console.log(message);
      });
  }, []);

  const onFilter = (filter) => {
    setFilter(filter);
    setRoutines(
      Datos.routines.filter(
        (e) => !filter || e.tags.some((t) => t.includes(filter))
      )
    );
  };

  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text>RUTINAS</Text>
        <TextInput
          label='Buscar'
          returnKeyType='next'
          value={filter}
          onChangeText={onFilter}
        />
        <FlatList
          data={routines}
          renderItem={RoutinePreview}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </View>
  );
}
