// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice'; // Import userSlice

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer, // Include user reducer
    },
});

export default store;
