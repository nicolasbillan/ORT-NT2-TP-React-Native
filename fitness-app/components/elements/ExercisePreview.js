import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../../styles";

export default function ExercisePreview({ excercise, ...props }) {
  return (
    <View>
      <Text>{excercise.nombre}</Text>
      <Text>{excercise.dificultad}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
