
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginNav from "./components/screens/login/LoginNav"
import TabsScreen from "./components/screens/TabsScreen";
import React, { useReducer, useEffect } from 'react';
import GlobalContext from './Context'
import {Datos, reducer} from './reducer'


const Stack = createNativeStackNavigator();



export default function App() {

  const [state,dispatch ] = useReducer(reducer, Datos)

  useEffect(() => {
    const data = AsyncStorage.getItem('token').then(
        (data)=>{console.log("devuelve data",data)
        if (data) {
          const jsonData = JSON.parse(data)
          dispatch({'type':'LOGIN', payload:{'email':jsonData.email, 'token':jsonData.token}})
        }

        })
        const exercises = AsyncStorage.getItem('exercises').then(
        (exercises) => {
        if (!exercises)
          retrieveExercises()
        })
    },[])

      function retrieveExercises() {

        // TODO: put on a helper method.
        const headers = new Headers()
        headers.append("Content-type", "application/json")
        headers.append("Access-Control-Allow-Origin", "http://localhost:3000/api/ejercicios")
        headers.append("Access-Control-Allow-Methods", "GET")
        headers.append("Access-Control-Allow-Headers", "Content-Type")

        const requestOptions = {
            method:"GET",
            headers:headers
          }

        return fetch('http://localhost:3000/api/ejercicios', requestOptions )
        .then( resp => {
            if (!resp.ok)
                throw Error("Error:" + resp.statusText)
            return resp.json()
        })
        .then( jsonExercises => {
           dispatch({'type':'STORE_EXERCISES', payload:{ 'exercises':jsonExercises }})
        })
        .catch( error => console.log("Error:" + error))
    }

      return (
        <GlobalContext.Provider value={{state,dispatch}}>
          <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                  headerShown: false
                }}
            >
              <Stack.Screen name="Login" component={LoginNav} />
              <Stack.Screen name="childNav" component={TabsScreen} />
    
            </Stack.Navigator>
          </NavigationContainer>
        </GlobalContext.Provider>
      );
}
