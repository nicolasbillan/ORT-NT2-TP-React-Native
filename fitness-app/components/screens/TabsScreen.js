import React from "react";
import { BottomNavigation } from "react-native-paper";
import HomeScreen from "./HomeScreen";
import RoutinesScreen from "./RoutinesScreen";
import PreferencesScreen from "./PreferencesScreen";
import FavoritesScreen from "./FavoritesScreen";

export default function App({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Inicio", icon: "home" },
    {
      key: "routines",
      title: "Rutinas",
      icon: "run-fast",
    },
    {
      key: "favorites",
      title: "Favoritos",
      icon: "heart",
      //badge: true,
    },
    {
      key: "preferences",
      title: "Preferencias",
      icon: "cog",
    },
  ]);

  const preferencesScreen = ({ route }) => {
    if (routes[index].key !== route.key) {
      return null;
    }
    return <PreferencesScreen navigation={navigation} />;
  };

  const homeScreen = ({ route }) => {
    if (routes[index].key !== route.key) {
      return null;
    }
    return <HomeScreen navigation={navigation} />;
  };

  const routinesScreen = ({ route }) => {
    if (routes[index].key !== route.key) {
      return null;
    }
    return <RoutinesScreen navigation={navigation} />;
  };

  const favoritesScreen = ({ route }) => {
    if (routes[index].key !== route.key) {
      return null;
    }
    return <FavoritesScreen navigation={navigation} />;
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={(index) => setIndex(index)}
      renderScene={BottomNavigation.SceneMap({
        home: homeScreen,
        routines: routinesScreen,
        favorites: favoritesScreen,
        preferences: preferencesScreen,
      })}
      sceneAnimationEnabled={false}
    />
  );
}
