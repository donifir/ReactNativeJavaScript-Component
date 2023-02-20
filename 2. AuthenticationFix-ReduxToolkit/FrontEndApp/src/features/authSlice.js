// import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'http://192.168.91.11:8000/api';

const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const resetState = createAsyncThunk('reset/resetState', async () => {
  return 'success';
});


export const getUserList = createAsyncThunk(
  'userList/getUserList',
  async () =>
    await axios
      .get('/user-list')
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error.response);
        return rejectWithValue(error.response);
      }),
);

export const postRegister = createAsyncThunk(
  'register/postRegister',
  async (data, {rejectWithValue}) =>
    await axios
      .post('/register', data, header)
      .then(function (response) {
        console.log(response.data.token, 'data token');
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('name', response.data.data.name);
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response);
      }),
);

export const postLogin = createAsyncThunk(
  'login/postLogin',
  async (data, {rejectWithValue}) =>
    await axios
      .post('/login', data, header)
      .then(function (response) {
        console.log(response.data, 'data token');
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('name', response.data.username);
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response);
      }),
);

export const postLogout = createAsyncThunk(
  'logout/postLogout',
  async rejectWithValue =>
    await axios
      .post('/logout', header)
      .then(function (response) {
        console.log(response.data, 'data token');
        AsyncStorage.removeItem('token', response.data.token);
        AsyncStorage.removeItem('name', response.data.username);
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response);
      }),
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isPending: false,
    isSuccess: false,
    isError: false,
    redirect: false,
    userList: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(resetState.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false);
      state.redirect = false;
    });

    builder.addCase(getUserList.pending, (state, action) => {
      (state.isLoading = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.isError = false);
      state.userList = action.payload;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    builder.addCase(postRegister.pending, (state, action) => {
      (state.isLoading = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.isError = false),
        (state.redirect = true);
    });
    builder.addCase(postRegister.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    builder.addCase(postLogin.pending, (state, action) => {
      (state.isLoading = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.isError = false),
        (state.redirect = true);
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = true);
    });

    builder.addCase(postLogout.pending, (state, action) => {
      (state.isLoading = true),
        (state.isSuccess = false),
        (state.isError = false);
    });
    builder.addCase(postLogout.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.isError = false),
        (state.redirect = true);

    });
    builder.addCase(postLogout.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = true);
    });
  },
});

export default authSlice.reducer;
