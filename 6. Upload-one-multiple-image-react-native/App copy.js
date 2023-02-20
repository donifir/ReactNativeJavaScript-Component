import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};


const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selelectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

export default function App() {
  const openGalery = async () => {
    const images = await launchImageLibrary(options);
    console.log(images.assets[0]);

    const formData = new FormData('file', {
      uri: images.assets[0].uri,
      types: images.assets[0].type,
      name: images.assets[0].fileName,
    });

    // axios
    // .post('http://192.168.91.14:8000/api/fileupload', formData, header)
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="upload" onPress={openGalery}></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
