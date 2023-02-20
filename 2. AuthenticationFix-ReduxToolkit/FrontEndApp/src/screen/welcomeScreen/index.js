import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Button} from '@react-native-material/core';
import BasicBotton from '../../component/basicBotton';

export default function WelcomeSchreen({navigation}) {
  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.wrapperCard}>
        <View style={styles.wrapperImage}>
          <View style={styles.WrapperTextHeader}>
            <Text style={styles.textHeader}>Welcome to Umberella</Text>
          </View>
          <View style={styles.wrapperSecconText}>
            <Text style={styles.textWrapperSecconText}>
              A Simpe Chat Platform for everyday use
            </Text>
          </View>
          <Image
            style={styles.image}
            source={require('./../../publik/image/Online_presentation_Two_Color.png')}
          />
         
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <BasicBotton text="Sign in" varian='dark'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <BasicBotton text="Sign up" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperCard: {
    marginHorizontal: 10,
    marginTop: 80,
    // backgroundColor: 'red',
    width: '95%',
    height: '95%',
  },
  textHeader: {
    fontSize: 29,
    fontWeight: '400',
    color: 'black',
  },
  wrapperSecconText: {
    paddingTop: 15,
  },
  wrapperSecconText: {
    paddingTop: 15,
  },
  textWrapperSecconText: {
    fontSize: 20,
    color: '#71787a',
  },
  image: {
    width: '100%',
    height: '60%',
  },
  wrapperBtn: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20,
  },
});
