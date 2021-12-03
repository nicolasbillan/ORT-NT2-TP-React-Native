import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button as PaperButton } from "react-native-paper";
import { styles } from "../../../styles";
import Tag from "./Tag";

export default function Preview({ item }) {
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
}
