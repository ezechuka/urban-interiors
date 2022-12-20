import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

const dataState = {
    isLoading: true,
    isFetching: false,
    isLoaded: false,
    error: null,
    data: {}
}

export const productSlice = createSlice({
    name: 'product',
    initialState: dataState,
    reducers: {
        fetchProduct(state, action) {
            return action.payload
        }
    }
})

export const { fetchProduct } = productSlice.actions

export default productSlice.reducer

export const getProduct = (productId) => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(fetchProduct({
            ...dataState, isFetching: true
        }))
        const firestore = getFirebase().firestore()
        const productDocRef = doc(firestore, 'products', `${productId}`)
        try {
            const product = await getDoc(productDocRef)
            if (product.exists)
                dispatch(fetchProduct({
                    ...dataState,
                    isLoading: false,
                    isFetching: false,
                    isLoaded: true,
                    data: product.data()
                }))
        } catch (e) {
            dispatch(fetchProduct({
                ...dataState.data,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                error: e,
                data: null
            }))
        }
    }
}