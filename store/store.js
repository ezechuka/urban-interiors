import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';

const persistFirebaseAuthConfig = {
    key: 'user',
    storage,
    whitelist: ['auth']
}

const persistFirebaseReducer = persistReducer(persistFirebaseAuthConfig, firebaseReducer)

export const store = configureStore({
    reducer: {
        persistFirebaseReducer,
        firestoreReducer
    },
    middleware: [thunk]
})

export const persistor = persistStore(store)