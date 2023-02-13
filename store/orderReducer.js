import { createSlice, isPending } from "@reduxjs/toolkit"
import { collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore"
import firebase from 'firebase/compat/app'
import { toast } from "react-toastify"

const dataState = {
    isLoading: true,
    isFetching: false,
    isLoaded: false,
    error: null,
    data: {}
}

const orderSlice = createSlice({
    name: 'orders',
    initialState: dataState,
    reducers: {
        fetchOrders(state, action) {
            return action.payload
        },
        createOrder(state, action) {
            return action.payload
        },
        updateStatus(state, action) {
            toast.info(action.payload)
            return
        }
    }
})

export const { fetchOrders, createOrder, updateStatus } = orderSlice.actions

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

export const addOrder = (userInfo, totalPrice, items) => {

    return async (dispatch, getState, { getFirebase }) => {
        dispatch(createOrder({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid

        firestore.collection(`users/${userId}/orders`).add({
            status: 'Pending',
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            totalPrice: totalPrice,
            phone: userInfo.phone,
            email: userInfo.email,
            fullname: userInfo.fullname,
            state: userInfo.state,
            city: userInfo.city,
            items: items
        }).then((orderRef) => {
            dispatch(createOrder({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: orderRef
            }))
        }).catch((e) => {
            dispatch(createOrder({
                ...dataState,
                isLoading: false,
                isFetching: false,
                error: e,
                data: null
            }))
        })
    }
}

export const retrieveAllOrders = () => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(fetchOrders({
            ...dataState, isFetching: true
        }))

        const userId = []
        const firestore = getFirebase().firestore()

        try {
            const querySnapshot = await getDocs(collection(firestore, 'users'))
            querySnapshot.forEach((doc) => {
                userId.push(doc.id)
            })

            userId.forEach((id) => {
                onSnapshot(collection(firestore, 'users', `${id}`, 'orders'),
                    (querySnapshot) => {
                        let result = []
                        querySnapshot.docChanges().forEach((change) => {
                            result.push({ orderId: change.doc.id, ...change.doc.data() })
                        })

                        dispatch(fetchOrders({
                            ...dataState,
                            isLoading: false,
                            isFetching: false,
                            isLoaded: true,
                            data: result
                        }))
                    },
                    onerror => {
                        dispatch(fetchOrders({
                            ...dataState,
                            isLoading: false,
                            isFetching: false,
                            isLoaded: true,
                            data: null,
                            error: onerror.message
                        }))
                    })
            })
        } catch (e) {
            dispatch(fetchOrders({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: null,
                error: e
            }))
        }
    }
}

export const updateOrderStatus = (uid, oid, status) => {
    // uid - user id
    // oid - order id
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(updateStatus({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        try {
            const orderRef = doc(firestore, 'users', uid, 'orders', oid)

            await updateDoc(orderRef, {
                status: status
            })

            dispatch(updateStatus('Order status has been updated'))
        } catch (e) {
            dispatch(updateStatus('Order status failed to update'))
        }
    }
}