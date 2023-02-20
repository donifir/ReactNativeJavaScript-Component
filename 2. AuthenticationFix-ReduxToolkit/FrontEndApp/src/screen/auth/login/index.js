import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import BtnBack from '../../../component/btnBack';
import BasicTextInput from '../../../component/basicTextInput';
import {Button} from '@react-native-material/core';
import BasicBotton from '../../../component/basicBotton';
import * as yup from 'yup';
import {Formik} from 'formik';
import {postLogin} from '../../../features/authSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const loginValidationScheema = yup.object().shape({
    email: yup
      .string()
      // .notOneOf(emails, 'email already to use')
      .email('Please enter valid email')
      .required('email is required'),
    password: yup
      .string()
      .min(8, ({min}) => `password musty be at least ${min} characters`)
      .required('password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
  });

  // const redirect = useSelector(state => state.auth.redirect);
  // useEffect(() => {
  //   console.log('data')
  //   if (redirect === true) {
  //     navigation.navigate('HomeScreen');
  //   }
  // }, [redirect]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        const data = {
          email: values.email,
          password: values.password,
        };
        dispatch(postLogin(data));
        //bsia dikasi logic untuk axios disini
      }} //ini adalah valuenya seperti formdata
      validationSchema={loginValidationScheema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapperCard}>
            <BtnBack />
            <View style={styles.wapperTextSign}>
              <Text style={styles.text}>Sign in</Text>
            </View>

            <View style={styles.wrapperTextInput}>
              <BasicTextInput
                placeholder="Email"
                icon="faEnvelope"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
              />
            </View>

            <View style={styles.wrapperTextInput}>
              <BasicTextInput
                placeholder="Password"
                icon="faLock"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
              />
            </View>

            <TouchableOpacity onPress={handleSubmit}>
              <BasicBotton text="Sign in" varian="dark" />
            </TouchableOpacity>

            <View style={styles.wrapperText}>
              <Text style={styles.textLink}>Already have an account? </Text>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Register')}>
                Sign up
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapperCard: {
    marginHorizontal: 10,
    marginTop: 10,
    // backgroundColor: 'red',
    width: '95%',
    height: '95%',
  },
  wapperTextSign: {
    marginTop: 30,
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
  },
  wrapperTextInput: {
    marginVertical: 10,
  },
  wrapperText: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
  },
  textLink: {
    fontSize: 15,
    color: 'black',
  },
  link: {
    color: '#117fed',
    fontSize: 15,
  },
});
