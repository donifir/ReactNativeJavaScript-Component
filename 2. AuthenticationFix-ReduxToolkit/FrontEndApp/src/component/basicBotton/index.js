import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function BasicBotton(props) {
  return (
    <>
      <View style={props.varian=='dark'?styles.wrapperBtn:styles.wrapperBtn2}>
        <Text style={props.varian=='dark'?styles.text:styles.text2}>{props.text}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapperBtn: {
    marginTop: 15,
    borderWidth: 1,
    alignItems: 'center',
    padding: 13,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#9c9998',
    backgroundColor: '#2b2c2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color:'white',
    fontWeight: '400',
  },
  wrapperBtn2: {
    marginTop: 15,
    borderWidth: 1,
    alignItems: 'center',
    padding: 13,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#2b2c2e',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    color:'#2b2c2e',
    fontSize: 18,
    fontWeight: '400',
  },
});
