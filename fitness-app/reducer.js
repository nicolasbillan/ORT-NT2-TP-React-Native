import AsyncStorage from "@react-native-async-storage/async-storage";
import { exerciseTagParse } from "./helpers/exerciseTagParse";

export let Datos = {
  username: "",
  first_name: "",
  email: "",
  token: "",
  loggedIn: false,
  exercises: [],
  favorites: [],
};

const storeToken = async (email, value) => {
  try {
    console.log("storeToken");
    Datos.loggedIn = true;
    Datos.token = value;
    Datos.email = email;
    await AsyncStorage.setItem(
      "token",
      JSON.stringify({ email: email, token: value })
    );
  } catch (e) {
    // saving error
  }
};

const storeExercises = async (exercises) => {
  try {
    console.log("storeExercises");
    exercises = exercises.map(exerciseTagParse);
    Datos.exercises = exercises;
    await AsyncStorage.setItem("exercises", JSON.stringify(exercises));
  } catch (e) {
    console.log("Error: " + e);
  }
};

const storeFavorites = async (exercises) => {
  try {
    console.log("storeFavorites");
    exercises = exercises.map(exerciseTagParse);
    Datos.favorites = exercises;
    await AsyncStorage.setItem("favorites", JSON.stringify(exercises));
  } catch (e) {
    console.log("Error: " + e);
  }
};

// Action tiene
// type:
// payload:
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      storeToken(action.payload.email, action.payload.token);
      Datos = {
        ...state,
        loggedIn: true,
        token: action.payload.token,
        email: action.payload.email,
      };
      return Datos;

    case "LOGOUT":
      storeToken(null);
      return { ...state, loggedIn: false, token: null };

    case "STORE_FAVORITES":
      storeFavorites(action.payload.favorites);
      return { ...state, favorites: Datos.favorites };

    case "STORE_EXERCISES":
      storeExercises(action.payload.exercises);
      return { ...state, exercises: Datos.exercises };
  }
};
