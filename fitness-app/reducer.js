import AsyncStorage from "@react-native-async-storage/async-storage";
import { exerciseTagParse } from "./helpers/exerciseTagParse";

export let Datos = {
  username: "",
  first_name: "",
  userId: "",
  email: "",
  token: "",
  loggedIn: false,
  exercises: [],
  favorites: [],
  routines: []
};

const storeToken = async (userId, email, value) => {
  try {
    console.log("storeToken");
    Datos.loggedIn = true;
    Datos.token = value;
    Datos.email = email;
    Datos.userId = userId;
    await AsyncStorage.setItem(
      "token",
      JSON.stringify({ userId: userId, email: email, token: value })
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

const storeRoutines = async (routines) => {
  try {
    console.log("storeRoutines");
    Datos.routines = routines;
    await AsyncStorage.setItem("routines", JSON.stringify(routines));
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
      storeToken(action.payload._id, action.payload.email, action.payload.token);
      Datos = {
        ...state,
        loggedIn: true,
        userId: action.payload._id,
        token: action.payload.token,
        email: action.payload.email,
      };
      return Datos;

    case "LOGOUT":
      storeToken(null);
      return { ...state, loggedIn: false, token: null, email: "", userId: "" };

    case "STORE_FAVORITES":
      storeFavorites(action.payload.favorites);
      return { ...state, favorites: Datos.favorites };

    case "STORE_EXERCISES":
      storeExercises(action.payload.exercises);
      return { ...state, exercises: Datos.exercises };

    case "STORE_ROUTINES":
      storeRoutines(action.payload.routines);
      return { ...state, routines: Datos.routines };
  }
};
