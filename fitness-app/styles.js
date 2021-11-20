import { StyleSheet } from "react-native";
import { DefaultTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 30,
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  "tab-icon": {
    width: 30,
    height: 30,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#f13a59',
  },
}

export { styles, theme };
