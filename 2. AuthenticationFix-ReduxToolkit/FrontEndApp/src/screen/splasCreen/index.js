import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { resetState } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SplashScreen() {
  const redirect = useSelector(state => state.auth.redirect);
  const dispatch = useDispatch()
  useEffect(() => {
    if (redirect === true) {
      setTimeout(() => {
        dispatch(resetState());
      }, 500);
    }
  }, [redirect])
  
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
})