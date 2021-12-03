import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { styles } from "../../../styles";

export default function Tag({ item }) {
  return (
    <View style={styles["exercise-tags"]}>
      <Text>{item}</Text>
    </View>
  );
}
