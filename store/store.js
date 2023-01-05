import { configureStore } from '@reduxjs/toolkit';
import { firebaseReducer, getFirebase } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';

import productsReducer from './productsReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
import orderReducer from './orderReducer';
import addProductReducer from './addProductReducer';

const persistFirebaseAuthConfig = {
    key: 'user',
    storage,
    whitelist: ['auth', 'profile']
}

const persistFirebaseReducer = persistReducer(persistFirebaseAuthConfig, firebaseReducer)

export const store = configureStore({
    reducer: {
        persistFirebase: persistFirebaseReducer,
        firestore: firestoreReducer,
        products: productsReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        addProduct: addProductReducer,
        wishlist: wishlistReducer
    },
    middleware: [thunk.withExtraArgument({ getFirebase })]
})

export const persistor = persistStore(store)