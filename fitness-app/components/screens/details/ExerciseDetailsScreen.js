import React, { useState } from "react";
import { FlatList, Pressable, Text, View, Image } from "react-native";
// import Video from "react-native-video";
import { styles } from "../../../styles";
import Tag from "../../elements/exercises/Tag";
import { setFavorite } from "../../../helpers/fitnessApi";

export default function ExerciseDetailsScreen({ navigation, ...props }) {
  const { exercise } = props.route.params;
  // const { navigation } = props;
  const [isFav, setFav] = useState(exercise.fav);

  let waiting = false;

  const onFavoritePress = () => {
    if (waiting) return;
    waiting = true;
    setFavorite(exercise._id)
      .then(() => {
        setFav(!isFav);
      })
      .catch((message) => {
        //dispatch({ type: "LOGOUT" });
        navigation.navigate("Login");
        console.log(message);
      })
      .finally(() => (waiting = false));
  };

  return (
    <View style={{ ...styles.container, alignContent: "top" }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles["big-title"]}>{exercise.nombre}</Text>
        <Pressable
          style={{ padding: 10, margin: 10 }}
          onPress={onFavoritePress}
        >
          <Image
            source={require(`../../../assets/${
              isFav ? "fav-full" : "fav-empty"
            }.png`)}
            style={styles["fav-icon"]}
          />
        </Pressable>
      </View>
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
      {/* <Video source={{ uri: "https://www.youtube.com/watch?v=B0p8iuh2sXg" }} ref={(ref) => (this.player = ref)} /> */}
    </View>
  );
}
