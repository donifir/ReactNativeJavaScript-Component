import { configureStore } from '@reduxjs/toolkit'
import authreducer from '../features/authSlice'

export default configureStore({
  reducer: {
    auth: authreducer,
  },
})