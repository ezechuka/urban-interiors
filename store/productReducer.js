import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        fetchProducts(state, action) {
            return action.payload
        }
    }
})

export const { fetchProducts } = productSlice.actions

export default productSlice.reducer