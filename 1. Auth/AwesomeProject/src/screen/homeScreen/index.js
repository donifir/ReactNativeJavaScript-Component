import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postLogout, resetState} from '../../features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const btnSubmit = async () => {
    console.log('1. data submit');
    await dispatch(postLogout());
  };

  const isSuccess = useSelector(state => state.auth.isSuccess);

  useEffect(() => {
    if (isSuccess === true) {
      // console.log('succeess')
      navigation.navigate('RedirectScreen');
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={btnSubmit}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: 'black',
  },
});
