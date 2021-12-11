import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../../../styles";
import DayTag from "./DayTag";

export default function Preview({ item }) {
  return (
    <View style={styles["exercise-preview"]}>
      <Text style={styles["excercise-title"]}>{item.nombre}</Text>
      <FlatList
        horizontal={true}
        data={item.dias}
        renderItem={DayTag}
        keyExtractor={(item) => item}
      ></FlatList>
    </View>
  );
}
