import React from "react";
import { BottomNavigation } from 'react-native-paper';
import HomeNav from "./home/HomeNav";
import RoutinesScreen from "./RoutinesScreen";
import PreferencesScreen from "./PreferencesScreen";
import FavoritesScreen from "./FavoritesScreen";


export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Inicio', icon: 'home' },
    {
      key: 'routines',
      title: 'Rutinas',
      icon: 'run-fast'
    },
    {
      key: 'favorites',
      title: 'Favoritos',
      icon: 'heart',
      badge: true,
    },
    {
      key: 'preferences',
      title: 'Preferencias',
      icon: 'cog'
    },
  ]);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={index => setIndex(index)}
      renderScene={BottomNavigation.SceneMap({
        home: HomeNav,
        routines: RoutinesScreen,
        favorites: FavoritesScreen,
        preferences: PreferencesScreen,
      })}
      sceneAnimationEnabled={false}
    />
  );
}
