import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        info: '',
        wishlist: []
    },
    reducers: {
        addItemToWishlist(state, action) {
            if (action.payload.info === 'ADD')
                toast.success('Item has been added to wishlist')
            else if (action.payload.info === 'FAIL')
                toast.info('Item already exists in wishlist')
            return {
                info: action.payload.info,
                wishlist: action.payload.items
            }
        },
        removeItemFromWishlist(state, action) {
            if (action.payload.info === 'DELETE')
                toast.info('Item has been removed from wishlist')
            return {
                info: action.payload.info,
                wishlist: action.payload.items
            }
        }
    }
})

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer

export const addToWishlist = (productId, wishlist) => {
    return async (dispatch, getState, { getFirebase }) => {
        if (wishlist.includes(productId)) {
            dispatch(addItemToWishlist(
                {
                    info: 'FAIL',
                    items: wishlist
                }
            ))
            return
        }
        const newWishlist = [...wishlist, productId]
        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid
        firestore
            .collection('users')
            .doc(userId)
            .update({
                'wishlist': newWishlist
            })
            .then(() => dispatch(addItemToWishlist(
                {
                    info: 'ADD',
                    items: newWishlist
                }
            )))
    }
}

export const deleteFromWishlist = (productId, wishlist) => {
    return async (dispatch, getState, { getFirebase }) => {
        const index = wishlist.indexOf(productId)
        wishlist.splice(index, 1)

        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid
        firestore
            .collection('users')
            .doc(userId)
            .update({
                'wishlist': wishlist
            })
            .then(() => dispatch(removeItemFromWishlist(
                {
                    info: 'DELETE',
                    items: wishlist
                }
            )))
    }
}