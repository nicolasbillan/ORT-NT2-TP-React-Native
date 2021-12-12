import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../../styles";
import Tag from "./Tag";

const ExercisePreview = ({ ...props }) => {
  const { navigation } = props;
  const item = props.item.item;

  return (
    <Pressable
      onPress={() => navigation.navigate("DetailsScreen", { exercise: item })}
    >
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
    </Pressable>
  );
};

export default ExercisePreview;
