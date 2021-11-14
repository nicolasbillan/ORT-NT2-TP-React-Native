import styles from "../../styles";

import React,{ useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity, TextInput} from 'react-native';
import GlobalContext from '../../Context'
import PasswordTextBox from '../elements/PasswordTextBox'

export default function App({ navigation }) {

  const [email, setEmail] = useState("test@mail.com")
  const [password, setPassword] = useState("abc123")
  const {state,dispatch } =useContext(GlobalContext)


  useEffect(()=>{
      if (state.loggedIn)
          navigation.navigate("childNav")
     
  },[state.loggedIn])

  function login() {

    // TODO: Headers for CORS preflight request validation with local backend
    // it should be in a configuration only for dev env.
    const headers = new Headers()
    headers.append("Content-type", "application/json")
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000/api/users/login")
    headers.append("Access-Control-Allow-Methods", "POST")
    headers.append("Access-Control-Allow-Headers", "Content-Type")

    const requestOptions = {
        method:"POST",
        headers:headers,
        body: JSON.stringify({"email": email, "password": password})
      }

    return fetch('http://localhost:3000/api/users/login', requestOptions )
    .then( resp => {
        if (!resp.ok)
            throw Error("Error en login:" + resp.statusText)
        return resp.json()
    })
    .then( jsonResp => {
        console.log("resp json:", jsonResp)
        // LOGIN OK
        dispatch({'type':'LOGIN_AND_STORE', payload:{'email':email, 'token':jsonResp.token}})
        navigation.navigate("childNav")
    })
    .catch( error => alert("Error:" + error))

}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Nombre de Usuario'
        onChangeText={setEmail}
      ></TextInput>
      <PasswordTextBox
        icon="lock"
        label="Contraseña"
        onChange={setPassword} />
      <TouchableOpacity
        style={styles.button}
        //onPress={() => navigation.navigate("Main")}
        onPress={() => login()}
      >
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
