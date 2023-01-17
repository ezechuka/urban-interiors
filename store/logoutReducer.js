import { createSlice } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage'

const logOutSlice = createSlice({
    name: 'app',
    initialState: {},
    reducers: {
        logOut: (state, action) => {
            return action.payload
        }
    }
})

export const { logOut } = logOutSlice.actions
export default logOutSlice.reducer

export const signOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        storage.removeItem('persist:user')
        localStorage.removeItem('PRODUCT_REF')
        getFirebase().logout()
        dispatch(logOut({success: true}))
    }
}