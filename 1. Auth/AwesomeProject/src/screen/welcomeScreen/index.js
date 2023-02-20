import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import gambar from '../../publik/image/Team presentation _Monochromatic.svg'
import { Button } from '@react-native-material/core'

export default function WelcomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapperCard}>
        <View style={styles.WrapperTextHeader}>
          <Text style={styles.textHeader}>Welcome to Umberella</Text>
        </View>
        <View style={styles.wrapperSecconText}>
          <Text style={styles.textWrapperSecconText}>A Simpe Chat Platform for everyday use</Text>
        </View>
        <View style={styles.wrapperImage}>
          <Image
            source={require('../../publik/image/Online_presentation_Two_Color.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.wrapperBtn}>
          <Button title="Sign in" color='#232526' onPress={() => navigation.navigate('Login')}/>
        </View>
        <View style={styles.wrapperBtn}>
          <Button title="Sign Up" color='#232526' onPress={() => navigation.navigate('Register')}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  wrapperCard: {
    marginHorizontal: 20,
  },
  WrapperTextHeader: {
    marginTop: 30,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: '400',
    color: 'black',
  },
  wrapperSecconText: {
    paddingTop: 15,
  },
  textWrapperSecconText: {
    fontSize: 18,
    color: '#71787a'
  },
  wrapperImage: {
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    width: '100%',
    height: '60%'
  },
  wrapperBtn:{
    marginTop:20
    // padingTop:'20', 
  }
})