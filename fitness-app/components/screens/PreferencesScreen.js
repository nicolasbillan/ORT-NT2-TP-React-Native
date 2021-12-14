import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useReducer } from "react";
import { Text, View, Pressable } from "react-native";
import { Datos, reducer } from "../../reducer";
import { styles } from "../../styles";

export default function App({ navigation }) {
  const [state, dispatch] = useReducer(reducer, Datos);



  return (
    <View style={styles.container}>
      <Text>PREFERENCES</Text>
      <Pressable
        onPress={() => {
          dispatch({ type: "LOGOUT" });
          navigation.navigate("Login");
        }}
      >
        <Text>LOGOUT</Text>
      </Pressable>
    </View>
  );
}
