import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useReducer } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FlatList, Text, View } from "react-native";
import { styles } from "../../../styles";
import { Datos, reducer } from "../../../reducer";
import { getExercises } from "../../../helpers/fitnessApi";
import ExercisePreview from "../../elements/exercises/Preview";
import TextInput from "../../elements/TextInput";

export default function HomeScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, Datos);
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("exercises")
      .then((data) => {
        if (data) {
          return JSON.parse(data);
        }
        return getExercises();
      })
      .then((data) => {
        dispatch({ type: "STORE_EXERCISES", payload: { exercises: data } });
      })
      .then(() => setExercises(Datos.exercises))
      .catch((message) => {
        dispatch({ type: "LOGOUT" });
        navigation.navigate("Login");
        console.log(message);
      });
  }, []);

  const onFilter = (filter) => {
    setFilter(filter);
    setExercises(
      Datos.exercises.filter(
        (e) => !filter || e.tags.some((t) => t.includes(filter))
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>WELCOME</Text>
        <TextInput
          label='Buscar'
          returnKeyType='next'
          value={filter}
          onChangeText={onFilter}
        />
        <FlatList
          data={exercises}
          renderItem={ExercisePreview}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </View>
  );
}
