import React, { useState, useEffect, useContext } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from './Background'
import Logo from './Logo'
import Header from './Header'
import Button from './Button'
import TextInput from './TextInput'
import BackButton from './BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from './helpers/emailValidator'
import { passwordValidator } from './helpers/passwordValidator'
import GlobalContext from '../../../Context'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const {state,dispatch } =useContext(GlobalContext)


  useEffect(()=>{
      if (state.loggedIn)
          navigation.navigate("childNav")
     
  },[state.loggedIn])

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    login();
  }

  

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
        body: JSON.stringify({"email": email.value, "password": password.value})
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
        dispatch({'type':'LOGIN_AND_STORE', payload:{'email':email.value, 'token':jsonResp.token}})
        navigation.navigate("childNav")
    })
    .catch( error => alert("Error:" + error))

}

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Bienvenido de vuelta.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
