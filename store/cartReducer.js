import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        info: '',
        items: []
    },
    reducers: {
        addItemToCart(state, action) {
            if (action.payload.info === 'ADD')
                toast.success('Item has been added to Cart')
            else if (action.payload.info === 'FAIL')
                toast.info('Item already exists in Cart')
            return { ...state, info: action.payload.info }
        },
        increaseItemQuantity(state, action) {
            return state
        },
        decreaseItemQuantity(state, action) {
            return state
        },
        deleteItemFromCart(state, action) {
            if (action.payload.info === 'DELETE')
                toast.info('Item has been deleted from Cart')
            return { ...state, info: action.payload.info }
        },
        clearCart(state, action) {
            return {...state, info: action.payload.info}
        }
    }
})

export const
    { addItemToCart, increaseItemQuantity, decreaseItemQuantity, deleteItemFromCart, clearCart }
    = cartSlice.actions

export default cartSlice.reducer

export const addToCart = (productId, cartItem, cart) => {
    return async (dispatch, getState, { getFirebase }) => {
        if (Object.keys(cart).includes(productId)) {
            dispatch(addItemToCart(
                {
                    info: 'FAIL'
                }
            ))
            return
        }
        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid
        firestore
            .collection('users')
            .doc(userId)
            .update({
                'cart': {
                    totalItems: Number(cart.totalItems) + 1,
                    totalPrice: Number(cart.totalPrice) + Number(cartItem.price),
                    items: {
                        ...cart.items,
                        [`${productId}`]: {
                            quantity: 1
                        }
                    }
                }
            }).then(() => {
                dispatch(addItemToCart({
                    info: 'ADD'
                }))
            })
    }
}

export const increaseQuantity = (productId, cartItem, cart) => {
    let cartProduct = cart.items[productId]
    console.log(cartProduct)
    let newCartItem = {
        quantity: cartProduct.quantity + 1
    }

    cart.items = { ...cart.items, [productId]: newCartItem }
    return async (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid
        firestore
            .collection('users')
            .doc(userId)
            .update({
                'cart': {
                    totalItems: Number(cart.totalItems) + 1,
                    totalPrice: Number(cart.totalPrice) + Number(cartItem.price),
                    items: cart.items
                }
            }).then(() => {
                dispatch(increaseItemQuantity())
            })
    }
}

export const decreaseQuantity = (productId, cartItem, cart) => {
    let cartProduct = cart.items[productId]
    let newCartItem = {
        quantity: cartProduct.quantity - 1
    }

    cart.items = { ...cart.items, [productId]: newCartItem }
    return async (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid
        firestore
            .collection('users')
            .doc(userId)
            .update({
                'cart': {
                    totalItems: Number(cart.totalItems) - 1,
                    totalPrice: Number(cart.totalPrice) - Number(cartItem.price),
                    items: cart.items
                }
            }).then(() => {
                dispatch(decreaseItemQuantity())
            })
    }
}

export const deleteFromCart = (productId, cartItem, quantity, cart) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid
        delete cart.items[productId]
        firestore
            .collection('users')
            .doc(userId)
            .update({
                'cart': {
                    totalItems: Number(cart.totalItems) - Number(quantity),
                    totalPrice: Number(cart.totalPrice) - (Number(cartItem.price) * Number(quantity)),
                    items: cart.items
                }
            }).then(() => {
                dispatch(deleteItemFromCart({
                    info: 'DELETE'
                }))
            })
    }
}

export const deleteCart = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore()
        const userId = getState().persistFirebase.auth.uid
        firestore
            .collection('users')
            .doc(userId)
            .update({
                'cart': {
                    totalItems: 0,
                    totalPrice: 0,
                    items: []
                }
            }).then(() => {
                dispatch(clearCart({
                    info: 'CLEAR'
                }))
            })
    }
}