import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";

const dataState = {
    isLoading: true,
    isFetching: false,
    isLoaded: false,
    error: null,
    data: {},
    lastVisible: null,
    endOfData: false
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
        },
        filterProductsBySubCategory(state, action) {
            return action.payload
        }
    }
})

export const { fetchProducts, filterProductsByPrice, filterProductsBySubCategory }
    = productSlice.actions

export default productSlice.reducer

export const getProducts = (path, prevData, lastVisible) => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(fetchProducts({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        const productRef = collection(firestore, 'products')
        const productQuery = query(productRef, where('category', '==', path),
            orderBy('createdAt'), startAfter(lastVisible || 0), limit(20))
        const result = {}
        try {
            const querySnapshot = await getDocs(productQuery)
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
            querySnapshot.forEach((product) => {
                result[product.id] = { pid: product.id, ...product.data() }
            })

            dispatch(fetchProducts({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: {...prevData, ...result},
                lastVisible: lastVisible,
                endOfData: querySnapshot.empty
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

export const getProductsByColor = (path, color, lastVisible) => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(fetchProducts({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        const productRef = collection(firestore, 'products')
        const priceFilterQuery = query(productRef, where('category', '==', path),
            orderBy('createdAt'), where('color', 'array-contains', color),
            startAfter(lastVisible || 0), limit(20))
        const result = {}
        try {
            const querySnapshot = await getDocs(priceFilterQuery)
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
            querySnapshot.forEach((product) => {
                result[product.id] = { pid: product.id, ...product.data() }
            })
            dispatch(fetchProducts({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: result,
                lastVisible,
                endOfData: querySnapshot.empty
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

export const getProductsByPrice = (path, minPrice, maxPrice, lastVisible) => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(fetchProducts({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        const productRef = collection(firestore, 'products')
        const priceFilterQuery = query(productRef, orderBy('productPrice'),
            where('category', '==', path), where('productPrice', '>=', minPrice), 
            where('productPrice', '<=', maxPrice), startAfter(lastVisible || 0), limit(20))
        const result = {}
        try {
            const querySnapshot = await getDocs(priceFilterQuery)
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
            querySnapshot.forEach((product) => {
                result[product.id] = { pid: product.id, ...product.data() }
            })
            dispatch(fetchProducts({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: result,
                lastVisible,
                endOfData: querySnapshot.empty
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

export const getProductsBySubCategory = (subCategory) => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(filterProductsBySubCategory({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        const productRef = collection(firestore, 'products')
        const subCategoryQuery = query(productRef, where('subcategory', 'array-contains', subCategory),
            orderBy('createdAt'), startAfter(dataState.lastVisible || 0), limit(20))
        const result = {}
        try {
            const querySnapshot = await getDocs(subCategoryQuery)
            querySnapshot.forEach((product) => {
                result[product.id] = { pid: product.id, ...product.data() }
            })

            dispatch(filterProductsBySubCategory({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: result,
                endOfData: querySnapshot.empty
            }))
        } catch (e) {
            dispatch(filterProductsBySubCategory({
                ...dataState,
                isLoading: false,
                isFetching: false,
                error: e,
                data: null
            }))
        }
    }
}