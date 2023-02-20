import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Routes from './src/routes';
import { Provider } from 'react-redux'
import store from './src/app/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
