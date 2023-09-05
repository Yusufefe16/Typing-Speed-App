import { configureStore } from '@reduxjs/toolkit';
import speedReducer from './speedSlice';

export const store = configureStore({
  reducer: {
    speed: speedReducer
  }
});