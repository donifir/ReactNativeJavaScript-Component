import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postLogout, resetState} from '../../features/authSlice';
import {useDispatch} from 'react-redux';
import BasicBotton from '../../component/basicBotton';

export default function HomeScreen() {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log(value, 'this value');
      if (value !== null) {
        // value previously stored
        Alert.alert(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
  }, []);

  const btnLogout =async()=>{
    await dispatch(postLogout())
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={getData}>
        <Text style={styles.text}>HomeScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={btnLogout}>
        <BasicBotton text="Logout" varian="dark" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
