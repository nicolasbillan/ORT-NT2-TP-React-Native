import React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
// import Video from "react-native-video";
import { styles } from "../../../styles";
import Tag from "../../elements/exercises/Tag";

export default function ExerciseDetailsScreen({ ...props }) {
  const { exercise } = props.route.params;
  return (
    <View style={{ ...styles.container, alignContent: "top" }}>
      <Text style={styles["big-title"]}>{exercise.nombre}</Text>
      <Text>{`Tipo: ${exercise.tipo}`}</Text>
      <Text>{`Dificultad: ${exercise.dificultad}`}</Text>
      <View>
        <Text>{`Músculos principales:`}</Text>
        <FlatList
          horizontal={true}
          data={exercise["musculos principales"]}
          renderItem={Tag}
          keyExtractor={(item) => item}
        />
      </View>
      <View>
        <Text>{`Músculos secundarios:`}</Text>
        <FlatList
          horizontal={true}
          data={exercise["musculos secundarios"]}
          renderItem={Tag}
          keyExtractor={(item) => item}
        />        
      </View>
      <Image source={require("../../../assets/animations/burpee_orig.gif")} style={{width: 300, height: 200}} />
      {/* <Video source={{ uri: "https://www.youtube.com/watch?v=B0p8iuh2sXg" }} ref={(ref) => (this.player = ref)} /> */}
    </View>
  );
}
