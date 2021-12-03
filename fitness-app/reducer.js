import AsyncStorage from "@react-native-async-storage/async-storage";

export let Datos = {
  username: "",
  first_name: "",
  email: "",
  token: "",
  loggedIn: false,
  exercises: [],
};

const storeToken = async (email, value) => {
  try {
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
    exercises = exercises.map((e) => {
      let tags = [];
      tags.push(e.nombre);
      tags.push(e.dificultad);
      tags.push(e.tipo);

      if (Array.isArray(e.elementos)) {
        e.elementos.forEach((element) => {
          tags.push(element);
        });
      } else {
        tags.push(e.elementos);
      }

      e["musculos principales"].forEach((element) => {
        tags.push(element);
      });

      e["musculos secundarios"].forEach((element) => {
        tags.push(element);
      });
      return { ...e, tags: tags };
    });
    Datos.exercises = exercises;
    await AsyncStorage.setItem("exercises", JSON.stringify(exercises));
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

    case "STORE_EXERCISES":
      storeExercises(action.payload.exercises);
      return { ...state, exercises: Datos.exercises };
  }
};
