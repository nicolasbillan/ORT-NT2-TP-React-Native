import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles";

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Nombre de Usuario'
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        keyboardType='visible-password'
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Main")}
      >
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
