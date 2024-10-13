import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import authReducer from './features/authSlice'; // Your auth reducer
import userReducer from './features/userSlice'; // Your auth reducer

const persistConfig = {
    key: 'root',
    storage, // This will store state in localStorage
};

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
    // other reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
