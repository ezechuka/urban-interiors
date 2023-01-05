import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const dataState = {
    isLoading: true,
    isFetching: false,
    isLoaded: false,
    error: null,
    data: null
}

export const addProductSlice = createSlice({
    name: 'addProducts',
    initialState: dataState,
    reducers: {
        addProduct(state, action) {
            toast.success('Product has been added to database')
            return action.payload
        }
    }
})

export const { addProduct } = addProductSlice.actions

export default addProductSlice.reducer

const uploadImage = async (category, images, prodRef, db) => {
    const storage = getStorage()
    const productImages = []

    images.forEach(image => {
        const productImageRef = ref(storage, `${category}/${image.name}`)
        uploadBytes(productImageRef, image).then(() => {
            getDownloadURL(productImageRef).then(url => {
                productImages.push(url)
                db.collection('products').doc(prodRef)
                    .update({ images: productImages })
            })
        })
    })


    return productImages
}

export const addNewProduct = (product) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore()
        const prodImgs = product.images
        const modProduct = { ...product, images: [] }
        // console.log(modProduct)

        firestore.collection('products').add(modProduct)
            .then(async (docRef) => {
                await uploadImage(product.category, prodImgs, docRef.id, firestore)
                dispatch(addProduct({
                    ...dataState,
                    isLoading: false,
                    isLoaded: true,
                    data: docRef.id
                }))
            })
            .catch((e) => {
                dispatch(addProduct({
                    ...dataState,
                    isLoading: false,
                    isLoaded: true,
                    error: e
                }))
            });
    }
}