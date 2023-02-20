import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import React from 'react';
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
  return 'reset';
});

export const postRegister = createAsyncThunk(
  'register/postRegister',
  async (formData, {rejectWithValue}) =>
    await axios
      .post('/register', formData, header)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response);
      }),
);

export const postLogin = createAsyncThunk(
  'login/postLogin',
  async (formData, {rejectWithValue}) =>
    await axios
      .post('/login', formData, header)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data, 'ini error login');
        return rejectWithValue(error.response.data.message);
      }),
);

export const postLogout = createAsyncThunk(
  'logout/postLogout',
  async (rejectWithValue) =>
    await axios
      .post('/logout', header)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data, 'ini error login');
        return rejectWithValue(error.response.data.message);
      }),
);


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    redirectAuth: false,
    authLoading: false,
    postData: [],
    dataError: [],
    dataSuccess: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(resetState.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.dataSuccess = []),
        (state.dataError = []);
    }),

      builder.addCase(postRegister.pending, (state, action) => {
        (state.isLoading = true),
          (state.isSuccess = false),
          (state.isError = false);
      }),
      builder.addCase(postRegister.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false)
          // (state.dataSuccess = action.payload);
      }),
      builder.addCase(postRegister.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true)
          // (state.dataError = action.payload);
      });
    // login
    builder.addCase(postLogin.pending, (state, action) => {
      (state.isLoading = true),
        (state.isSuccess = false),
        (state.isError = false),
        (state.dataSuccess = []),
        (state.dataError = []);
    }),
      builder.addCase(postLogin.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false),
          (state.dataSuccess = action.payload),
          (state.dataError = []);
      }),
      builder.addCase(postLogin.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true),
          (state.dataError = action.payload),
          (state.dataSuccess = []);
      });
    // login
    builder.addCase(postLogout.pending, (state, action) => {
      (state.isLoading = true),
        (state.isSuccess = false),
        (state.isError = false);
    }),
      builder.addCase(postLogout.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = true),
          (state.isError = false);
      }),
      builder.addCase(postLogout.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isSuccess = false),
          (state.isError = true);
      });
  },
});

export default authSlice.reducer;
