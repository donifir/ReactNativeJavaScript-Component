import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from '@react-native-material/core';
import {useDispatch, useSelector} from 'react-redux';
import {postLogin, resetState} from '../../../features/authSlice';

import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const submitData = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    await dispatch(postLogin(formData));
  };
  //  success
  const isSuccess = useSelector(state => state.auth.isSuccess);
  const dataSuccess = useSelector(state => state.auth.dataSuccess);

  useEffect(() => {
    if (isSuccess===true) {
      navigation.navigate('RedirectScreen')
      AsyncStorage.setItem('id', ''+dataSuccess.user_id)
      AsyncStorage.setItem('name', dataSuccess.username)
      AsyncStorage.setItem('token', dataSuccess.token)
      dispatch(resetState())
    }
  }, [isSuccess]);

  return (
    <View>
      <TextInput
        variant="standard"
        label="Email"
        style={{margin: 16}}
        color="black"
        value={email}
        onChangeText={value => setEmail(value)}
      />

      <TextInput
        variant="standard"
        label="Password"
        style={{margin: 16}}
        color="black"
        value={password}
        onChangeText={value => setPassword(value)}
      />

      <View style={styles.wrapperBtn}>
        <Button
          color="black"
          title="Submit"
          style={{width: '80%'}}
          onPress={submitData}
        />
      </View>

      <View style={styles.wrapperDaftar}>
        <Text style={styles.text}>Belum Punya akun.?</Text>
        <Text
          style={styles.textDaftar}
          onPress={() => navigation.navigate('Register')}>
          Daftar.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperBtn: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperDaftar: {
    marginTop: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  textDaftar: {
    fontSize: 16,
    marginLeft: 10,
    color: '#1e56b0',
  },
});
