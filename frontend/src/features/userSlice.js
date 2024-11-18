import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        username: '',
        phoneNumber: '',
        balance: 0,
        debts: {},
    },
    debts: {}, // This holds the debts state
    friends: [],
    groups: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        resetUser: () => initialState,
    },
});

export const { setUser, setFriends, setGroups, setDebts, resetUser } = userSlice.actions;
export default userSlice.reducer;
