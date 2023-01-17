import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import logoutReducer from './logoutReducer';

const persistFirebaseAuthConfig = {
    key: 'user',
    storage,
    whitelist: ['auth', 'profile']
}

const persistFirebaseReducer = persistReducer(persistFirebaseAuthConfig, firebaseReducer)

const combinedReducers = combineReducers({
    persistFirebase: persistFirebaseReducer,
    firestore: firestoreReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    addProduct: addProductReducer,
    wishlist: wishlistReducer,
    logout: logoutReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'app/logout') {
        state = undefined
    }
    return combinedReducers(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk.withExtraArgument({ getFirebase })]
})

export const persistor = persistStore(store)