const url = "https://blooming-ridge-70656.herokuapp.com/api";
// const url = "http://localhost:3000/api";
const usersRoute = "users";
const excercisesRoute = "ejercicios";
const routinesRoute = "rutinas";
import { Datos } from "../reducer.js";

async function sendRequest(url, method, body) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Token", Datos.token);

  const requestOptions = {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
  };

  return fetch(url, requestOptions).then((resp) => {
    if (!resp.ok) {
      throw resp.statusText;
    }
    return resp.json();
  });
}

export async function getRoutine(name) {
  return sendRequest(`${url}/${routinesRoute}/${name}`, "GET", null);
}

export async function getRoutinesForUser(userId) {
  let user = await sendRequest(`${url}/${usersRoute}/${userId}`, "GET", null);
  return user.rutinas;
}

export async function getFavorites() {
  return sendRequest(`${url}/${excercisesRoute}/favoritos`, "GET", null);
}

export async function getExercises() {
  return sendRequest(`${url}/${excercisesRoute}`, "GET", null);
}

export async function register(email, name, password) {
  let body = { nombre: name, email: email, password: password };
  return sendRequest(`${url}/${usersRoute}`, "POST", body);
}

export async function login(email, password) {
  let body = { email: email, password: password };
  return sendRequest(`${url}/${usersRoute}/login`, "POST", body);
}
