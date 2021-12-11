import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { styles } from "../../../styles";

export default function ExerciseDetailsScreen({ exercise }) {
  return (
    <View style={styles.container}>
      <Text>{exercise.nombre}</Text>
    </View>
  );
}
