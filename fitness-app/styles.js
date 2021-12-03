import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

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
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  "tab-icon": {
    width: 30,
    height: 30,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  "exercise-tags": {
    borderRadius: 5,
    backgroundColor: "green",
    margin: 10,
    padding: 10,
  },
  "exercise-preview": {
    borderRadius: 10,
    backgroundColor: "lightblue",
    margin: 10,
    padding: 10,
  },
  "excercise-title": { 
    fontSize: 20,
    fontWeight: "bold",
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#000000",
    primary: "#560CCE",
    secondary: "#414757",
    error: "#f13a59",
  },
};

export { styles, theme };
