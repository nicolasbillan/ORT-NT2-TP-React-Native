import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { styles } from "../../../styles";
import Tag from "./Tag";

const ExercisePreview = ({ ...props }) => {
  const { navigation } = props;
  const [tags, setTags] = useState([]);
  const item = props.item.item;

  const onMount = () => {
    setTags(
      item.tags.filter(
        (t) => t !== item.nombre && t !== item.tipo && t !== item.dificultad
      )
    );
  };

  const onUnmount = () => {
    setTags([]);
  };

  useEffect(() => {
    onMount();
    return onUnmount;
  }, []);

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
          data={tags}
          renderItem={Tag}
          keyExtractor={(item) => item}
        ></FlatList>
      </View>
    </Pressable>
  );
};

export default ExercisePreview;
