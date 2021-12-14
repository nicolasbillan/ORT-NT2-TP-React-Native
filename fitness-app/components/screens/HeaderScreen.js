import React from "react";
import { Appbar } from "react-native-paper";

const _goBack = () => console.log("Went back");

const _handleSearch = () => console.log("Searching");

const _handleMore = () => console.log("Shown more");

export default function App({ navigation }) {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title='FitnessApp' subtitle='' />
      <Appbar.Action icon='magnify' onPress={_handleSearch} />
      <Appbar.Action icon='dots-vertical' onPress={_handleMore} />
    </Appbar.Header>
  );
}
