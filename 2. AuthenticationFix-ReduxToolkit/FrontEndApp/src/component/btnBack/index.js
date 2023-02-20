import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faArrowCircleLeft, faArrowLeft, faArrowLeftLong, faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function BtnBack() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.wrapperIcon} onPress={() => navigation.goBack()}>
      <FontAwesomeIcon icon={faArrowLeft} size={ 25 } />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapperIcon:{
    // margin:10,
  }
});
