import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../../styles";

const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export default function DayTag({ item }) {
  return (
    <View style={styles["routine-daytag"]}>
      <Text>{days[item]}</Text>
    </View>
  );
}
