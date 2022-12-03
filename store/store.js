import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer, getFirebase } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';

import productReducer from './productReducer';

const persistFirebaseAuthConfig = {
    key: 'user',
    storage,
    whitelist: ['auth']
}

const persistFirebaseReducer = persistReducer(persistFirebaseAuthConfig, firebaseReducer)

export const store = configureStore({
    reducer: {
        persistFirebase: persistFirebaseReducer,
        firestore: firestoreReducer,
        product: productReducer
    },
    middleware: [thunk.withExtraArgument(getFirebase)]
})

export const persistor = persistStore(store)