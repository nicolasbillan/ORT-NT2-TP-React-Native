import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { styles } from "../../../styles";
import Tag from "./Tag";

export default function Preview({ item }) {
  return (
    <View style={styles["exercise-preview"]}>
      <Text style={styles["excercise-title"]}>{item.nombre}</Text>
      <FlatList
        horizontal={true}
        data={item.dias.filter(
          (t) => t !== item.nombre
        )}
        renderItem={Tag}
        keyExtractor={(item) => item}
      ></FlatList>
    </View>
  );
}
