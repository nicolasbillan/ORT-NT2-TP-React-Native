import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useReducer } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { FlatList, Text, View } from "react-native";
import { styles } from "../../styles";
import { Datos, reducer } from "../../reducer";
import { getExercises } from "../../helpers/fitnessApi";
import ExercisePreview from "../elements/exercises/Preview";
import TextInput from "../elements/TextInput";

export default function HomeScreen({ navigation }) {
  const [state, dispatch] = useReducer(reducer, Datos);
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState("");

  let mounted = false;

  const onMount = () => {
    mounted = true;
    // console.log("home");
  };

  const onUnmount = () => {
    mounted = false;
    setExercises([]);
    // console.log(mounted);
  };

  useEffect(() => {
    onMount();
    AsyncStorage.getItem("exercises")
      .then((data) => {
        if (!mounted) return;
        if (data) {
          return JSON.parse(data);
        }
        return getExercises();
      })
      .then((data) => {
        if (mounted) {
          dispatch({ type: "STORE_EXERCISES", payload: { exercises: data } });
        }
      })
      .then(() => {
        if (mounted) {
          setExercises(Datos.exercises);
        }
      })
      .catch((message) => {
        dispatch({ type: "LOGOUT" });
        navigation.navigate("Login");
        console.log(message);
      });

    return onUnmount;
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
        <TextInput
          style={styles["search-box"]}
          label='Buscar'
          returnKeyType='next'
          value={filter}
          onChangeText={onFilter}
        />
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
