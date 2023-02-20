import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Login from '../screen/auth/login';
import Register from '../screen/auth/register';
import HomeScreen from '../screen/homeScreen';
import SplashScreen from '../screen/splasCreen';
import WelcomeSchreen from '../screen/welcomeScreen';

export default function Routes() {

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);


  const Stack = createNativeStackNavigator();
  const redirect = useSelector(state => state.auth.redirect);

  const getData = async () => {
    try {
      const tokens = await AsyncStorage.getItem('token');
      console.log(tokens, 'this token');
      if (!tokens) {
        setToken('');
        setLoading('false');
      } else {
        setToken(tokens);
        setLoading('false');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [redirect]);

  if (redirect === true) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="Welcome Screen"
            component={WelcomeSchreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
