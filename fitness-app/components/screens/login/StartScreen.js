import React, { useEffect, useContext } from 'react'
import Background from './Background'
import Logo from './Logo'
import Header from './Header'
import Button from './Button'
import Paragraph from './Paragraph'
import GlobalContext from '../../../Context'

export default function StartScreen({ navigation }) {

  const {state,dispatch } =useContext(GlobalContext)

  useEffect(()=>{
    if (state.loggedIn)
        navigation.navigate("childNav")
   
},[state.loggedIn])

  return (
    <Background>
      <Logo />
      <Header>FitnessApp</Header>
      <Paragraph>
        Logueate para comenzar a utilizar la aplicación.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Registrarse
      </Button>
    </Background>
  )
}
