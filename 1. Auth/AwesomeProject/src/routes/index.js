import React from 'react';
import RegisterScreen from '../screen/auth/register';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/auth/login';
import WelcomeScreen from '../screen/welcomeScreen';
import HomeScreen from '../screen/homeScreen';
import RedirectScreenHomeScreen from '../screen/homeScreen';
import RedirectScreen from '../screen/redirectScreen';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RedirectScreen" component={RedirectScreen} />
    </Stack.Navigator>
  );
}
