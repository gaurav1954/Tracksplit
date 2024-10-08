// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false, // Track authentication state
    },
    reducers: {
        login: (state) => {
            state.isAuthenticated = true; // Set to true on login
        },
        logout: (state) => {
            state.isAuthenticated = false; // Set to false on logout
        },
    },
});

// Export actions
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
