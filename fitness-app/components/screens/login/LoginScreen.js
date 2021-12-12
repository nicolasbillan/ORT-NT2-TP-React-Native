import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../elements/Background";
import Logo from "../../elements/Logo";
import Header from "../../elements/Header";
import Button from "../../elements/Button";
import TextInput from "../../elements/TextInput";
import BackButton from "../../elements/BackButton";
import { theme } from "../../../styles";
import { emailValidator } from "./helpers/emailValidator";
import { passwordValidator } from "./helpers/passwordValidator";
import GlobalContext from "../../../Context";
import { login } from "../../../helpers/fitnessApi";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (state.loggedIn) navigation.navigate("childNav");
  }, [state.loggedIn]);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    onLoginExcecute();
  };

  async function onLoginExcecute() {
    return login(email.value, password.value)
      .then((jsonResp) => {
        dispatch({
          type: "LOGIN",
          payload: { email: email.value, token: jsonResp.token },
        });
        dispatch({
          type: "STORE_ROUTINES",
          payload: { routines: jsonResp.user.rutinas },
        });
        navigation.navigate("childNav");
      })
      .catch((e) => {
        setPassword({ ...password, error: "Email o contraseña inválidos." });
      });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Bienvenido de vuelta.</Header>
      <TextInput
        label='Email'
        returnKeyType='next'
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize='none'
        autoCompleteType='email'
        textContentType='emailAddress'
        keyboardType='email-address'
      />
      <TextInput
        label='Contraseña'
        returnKeyType='done'
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button mode='contained' onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
