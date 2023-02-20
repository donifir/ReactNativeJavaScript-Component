import {
  Alert,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

export default function RedirectScreen({navigation}) {
  const isSuccess = useSelector(state => state.auth.isSuccess);

  // tes
  const getData = async () => {
    navigation.navigate('HomeScreen');

    try {
      const value = await AsyncStorage.getItem('token');
      if (value) {
        // Alert.alert('token', value);
        navigation.navigate('HomeScreen');
        // value previously stored
      } else {
        navigation.navigate('WelcomeScreen');
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getData}>
        <Text style={styles.text}>RedirectScreen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  text: {
    color: 'black',
  },
});
