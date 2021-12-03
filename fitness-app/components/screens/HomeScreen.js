import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { styles } from "../../styles";
import { Datos, reducer } from "../../reducer";
import { getExercises } from "../../helpers/fitnessApi";
import ExercisePreview from "../elements/exercises/Preview";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, Datos);

  useEffect(() => {
    AsyncStorage.getItem("excercises")
      .then((data) => {
        if (!data) {
          return getExercises();
        }
      })
      .then((data) => {
        dispatch({ type: "STORE_EXERCISES", payload: { exercises: data } });
      })
      .catch((message) => {
        navigation.navigate("Login");
        console.log(message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>WELCOME</Text>
        <FlatList
          data={state.exercises}
          renderItem={ExercisePreview}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </View>
  );
}
