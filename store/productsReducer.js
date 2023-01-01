import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";

const dataState = {
    isLoading: true,
    isFetching: false,
    isLoaded: false,
    error: null,
    data: {}
}

export const productSlice = createSlice({
    name: 'products',
    initialState: dataState,
    reducers: {
        fetchProducts(state, action) {
            return action.payload
        },
        filterProductsByPrice(state, action) {
            return action.payload
        }
    }
})

export const { fetchProducts, filterProductsByPrice } = productSlice.actions

export default productSlice.reducer

export const getProducts = (path) => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(fetchProducts({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        const productRef = collection(firestore, 'products')
        const productQuery = query(productRef, where('category', '==', path))
        const result = {}
        try {
            const querySnapshot = await getDocs(productQuery)
            querySnapshot.forEach((product) => {
                result[product.id] = { pid: product.id, ...product.data() }
            })
            dispatch(fetchProducts({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: result
            }))
        } catch (e) {
            dispatch(fetchProducts({
                ...dataState,
                isLoading: false,
                isFetching: false,
                error: e,
                data: null
            }))
        }
    }
}

export const getProductsByPrice = (path, minPrice, maxPrice) => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(fetchProducts({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        const productRef = collection(firestore, 'products')
        const priceFilterQuery = query(productRef, where('category', '==', path),
            where('price', '>=', minPrice), where('price', '<=', maxPrice))
        const result = {}
        try {
            const querySnapshot = await getDocs(priceFilterQuery)
            querySnapshot.forEach((product) => {
                result[product.id] = { pid: product.id, ...product.data() }
            })
            dispatch(fetchProducts({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: result
            }))
        } catch (e) {
            dispatch(fetchProducts({
                ...dataState,
                isLoading: false,
                isFetching: false,
                error: e,
                data: null
            }))
        }
    }
}