import { createSlice } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"

const dataState = {
    isLoading: true,
    isFetching: false,
    isLoaded: false,
    error: null,
    data: []
}

const orderSlice = createSlice({
    name: 'orders',
    initialState: dataState,
    reducers: {
        fetchOrders(state, action) {
            return action.payload
        }
    }
})

export const { fetchOrders } = orderSlice.actions

export default orderSlice.reducer

export const retrieveOrders = () => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(fetchOrders({
            ...dataState, isFetching: true
        }))
        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid

        try {
            const orderQuerySnapshot = await getDocs(collection(
                firestore, 'users', userId, 'orders'
            ))
            const orders = []
            orderQuerySnapshot.forEach((doc) =>
                orders.push({
                    pid: doc.id, ...doc.data()
                })
            )
            dispatch(fetchOrders({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: orders
            }))
        } catch (e) {
            dispatch(fetchOrders({
                ...dataState,
                isLoading: false,
                isFetching: false,
                error: e,
                data: null
            }))
        }
    }
}