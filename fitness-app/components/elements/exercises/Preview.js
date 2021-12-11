import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../../../styles";
import Tag from "./Tag";

const ExercisePreview = ({ item }) => {
  return (
    <View style={styles["exercise-preview"]}>
      <Text style={styles["excercise-title"]}>{item.nombre}</Text>
      <Text>{`Tipo: ${item.tipo}`}</Text>
      <Text>{`Dificultad: ${item.dificultad}`}</Text>
      <FlatList
        horizontal={true}
        data={item.tags.filter(
          (t) => t !== item.nombre && t !== item.tipo && t !== item.dificultad
        )}
        renderItem={Tag}
        keyExtractor={(item) => item}
      ></FlatList>
    </View>
  );
};

export default ExercisePreview;
