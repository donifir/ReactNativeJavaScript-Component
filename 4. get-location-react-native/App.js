import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GetLocation from 'react-native-get-location';

export default function App() {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      console.log(location);
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });
  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
