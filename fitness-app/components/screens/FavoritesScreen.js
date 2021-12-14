import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useReducer, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { styles } from "../../styles";
import { Datos, reducer } from "../../reducer";
import { getFavorites } from "../../helpers/fitnessApi";
import ExercisePreview from "../elements/exercises/Preview";
import { ScrollView } from "react-native-gesture-handler";

export default function FavoritesScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, Datos);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getFavorites()
      .then((data) => {
        dispatch({ type: "STORE_FAVORITES", payload: { favorites: data } });
      })
      .then(() => setExercises(Datos.favorites))
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
          data={exercises}
          renderItem={(item) => (
            <ExercisePreview item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </View>
  );
}
