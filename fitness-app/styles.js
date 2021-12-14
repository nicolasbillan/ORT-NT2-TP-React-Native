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
    color: "linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  "tab-icon": {
    width: 30,
    height: 30,
  },
  "search-box": {
    padding: 10,
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
  "big-title": {
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "center",
    textAlignVertical: "top",
  },
  "routine-daytag": {
    borderRadius: 5,
    // borderWidth: 2.5,
    backgroundColor: "red",
    margin: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  "fav-icon": {
    alignSelf: "center",
    width: 50,
    height: 50, 
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
