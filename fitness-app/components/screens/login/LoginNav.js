import React from 'react'
import { Provider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../../core/theme'
import {
  StartScreen,
  LoginScreen,
} from '.'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    </Provider>
  )
}