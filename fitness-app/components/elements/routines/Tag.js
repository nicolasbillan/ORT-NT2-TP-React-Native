import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../../styles";

export default function Tag({ item }) {
  return (
    <View style={styles["exercise-tags"]}>
      <Text>{item}</Text>
    </View>
  );
}
