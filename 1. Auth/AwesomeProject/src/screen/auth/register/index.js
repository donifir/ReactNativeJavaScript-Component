import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from '@react-native-material/core';
import {useDispatch} from 'react-redux';
import {postRegister} from '../../../features/authSlice';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const submitData = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    await dispatch(postRegister(formData));
  };

  return (
    <View>
      <TextInput
        variant="standard"
        label="Username"
        style={{margin: 16}}
        color="black"
        value={name}
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        variant="standard"
        label="Email"
        style={{margin: 16}}
        color="black"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        variant="standard"
        label="Password"
        style={{margin: 16}}
        color="black"
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TextInput
        variant="standard"
        label="Confirm Password"
        style={{margin: 16}}
        color="black"
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
      />
      <View style={styles.wrapperBtn}>
        <Button
          color="black"
          title="Submit"
          style={{width: '80%'}}
          onPress={submitData}
        />
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
});
