// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        username: '',
        phoneNumber: '',
        balance: 0,
        debts: {},
    },
    friends: [],
    groups: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Update user data
        },
        setFriends: (state, action) => {
            state.friends = action.payload; // Update friends array
        },
        setGroups: (state, action) => {
            state.groups = action.payload; // Update groups array
        },
        // Removed setAuth here as it's already in authSlice
        resetUser: () => initialState, // Reset user state on logout
    },
});

export const { setUser, setFriends, setGroups, resetUser } = userSlice.actions;
export default userSlice.reducer;
