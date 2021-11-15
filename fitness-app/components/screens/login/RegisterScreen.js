import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../elements/Background'
import Logo from '../../elements/Logo'
import Header from '../../elements/Header'
import Button from '../../elements/Button'
import TextInput from '../../elements/TextInput'
import BackButton from '../../elements/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from './helpers/emailValidator'
import { passwordValidator } from './helpers/passwordValidator'
import { nameValidator } from './helpers/nameValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isDisabled, setIsDisabled] = useState(false)
  

  const onSignUpPressed = () => {    
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    setIsDisabled(true)
    signup();
  }

  function signup() {

    // TODO: Headers for CORS preflight request validation with local backend
    // it should be in a configuration only for dev env.
    const headers = new Headers()
    headers.append("Content-type", "application/json")
    headers.append("Access-Control-Allow-Origin", "http://localhost:3000/api/users")
    headers.append("Access-Control-Allow-Methods", "POST")
    headers.append("Access-Control-Allow-Headers", "Content-Type")

    const requestOptions = {
        method:"POST",
        headers:headers,
        body: JSON.stringify({"nombre": name.value, "email": email.value, "password": password.value})
      }

    return fetch('http://localhost:3000/api/users', requestOptions )
    .then( resp => {
        if (!resp.ok)
            throw Error("Error en registro:" + resp.statusText)
        return resp.json()
    })
    .then( jsonResp => {
        console.log("resp json:", jsonResp)
        navigation.navigate("LoginScreen")
    })
    .catch( error => alert("Error:" + error))
    // TODO: use a snackbar to show error
}

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Crear Cuenta</Header>
      <TextInput
        label="Nombre"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
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
      <Button
        mode="contained"
        disabled={isDisabled}
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registrarse
      </Button>
      <View style={styles.row}>
        <Text>¿Ya posee una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
