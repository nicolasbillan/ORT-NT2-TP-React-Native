import React, { useState } from 'react'
import Background from '../../elements/Background'
import BackButton from '../../elements/BackButton'
import Logo from '../../elements/Logo'
import Header from '../../elements/Header'
import TextInput from '../../elements/TextInput'
import Button from '../../elements/Button'
import { emailValidator } from './helpers/emailValidator'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restablecer contraseña</Header>
      <TextInput
        label="Dirección de email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Recibirá un correo electrónico con un enlace para restablecer la contraseña."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Enviar
      </Button>
    </Background>
  )
}
