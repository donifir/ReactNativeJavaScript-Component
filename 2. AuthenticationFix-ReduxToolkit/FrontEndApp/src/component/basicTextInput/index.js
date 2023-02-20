import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faEnvelope,
  faLockOpen,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

export default function BasicTextInput(props) {
  // const icon=(props.icon==faUser ? faUser:faEnvelope)
  const icon =
    props.icon == 'faUser'
      ? faUser
      : props.icon == 'faEnvelope'
      ? faEnvelope
      : props.icon == 'faLockOpen'
      ? faLockOpen
      : faLock;

  return (
    <>
      <View style={styles.wrapperTextInput}>
        <FontAwesomeIcon icon={icon} size={23} color="#9c9998" />
        <TextInput
        color={'black'}
          style={styles.input}
          placeholder={props.placeholder}
          placeholderTextColor={'#484a49'}
          autoCapitalize="none"
          value={props.value}
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
        />
      </View>
      <Text style={{color: 'red'}}>{props.error}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  wrapperTextInput: {
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#9c9998',
  },
  input: {
    height: 40,
    padding: 10,
    flex: 1,
  },
});
