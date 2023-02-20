import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BtnBack from '../../../component/btnBack';
import BasicTextInput from '../../../component/basicTextInput';
import BasicBotton from '../../../component/basicBotton';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUserList, postRegister} from '../../../features/authSlice';

export default function Register({navigation}) {
  const [emails, setemails] = useState([]);
  const dispatch = useDispatch();
  const userList = useSelector(state => state.auth.userList);
  const redirect = useSelector(state => state.auth.redirect);
  // console.log(userList);
  useEffect(() => {
    dispatch(getUserList());
  }, []);

  useEffect(() => {
    if (userList) {
      let newArray = userList.map(item => {
        return item.email;
      });
      setemails(newArray);
    }
  }, [userList]);

  // useEffect(() => {
  //   if (redirect === true) {
  //     navigation.navigate('HomeScreen');
  //   }
  // }, [redirect]);

  const loginValidationScheema = yup.object().shape({
    username: yup
      .string()
      .min(3, ({min}) => `username musty be at least ${min} characters`)
      .required('username is required'),
    email: yup
      .string()
      .notOneOf(emails, 'email already to use')
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
    confirmPassword: yup
      .string()
      .equals([yup.ref('password'), null], 'password not match'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        const data = {
          name: values.username,
          email: values.email,
          password: values.password,
          confirm_password: values.confirmPassword,
        };
        dispatch(postRegister(data));
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
          <ScrollView>
            <View style={styles.wrapperCard}>
              <BtnBack />
              <View style={styles.wapperTextSign}>
                <Text style={styles.text}>Signup</Text>
              </View>

              <View style={styles.wrapperTextInput}>
                <BasicTextInput
                  error={touched.username && errors.username}
                  placeholder="Username"
                  icon="faUser"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </View>

              <View style={styles.wrapperTextInput}>
                <BasicTextInput
                  error={touched.email && errors.email}
                  placeholder="Email"
                  icon="faEnvelope"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>

              <View style={styles.wrapperTextInput}>
                <BasicTextInput
                  error={touched.password && errors.password}
                  placeholder="Password"
                  icon="faLock"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
              </View>

              <View style={styles.wrapperTextInput}>
                <BasicTextInput
                  error={touched.confirmPassword && errors.confirmPassword}
                  placeholder="Confirm Password"
                  icon="faLockOpen"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity onPress={handleSubmit}>
                <BasicBotton text="Submit" varian="dark" />
              </TouchableOpacity>

              <View style={styles.wrapperText}>
                <Text style={styles.textLink}>Already have an account? </Text>
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate('Login')}>
                  Sign in
                </Text>
              </View>
            </View>
          </ScrollView>
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
