import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import firebase from 'firebase/compat/app'

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

export const addNewProduct = (product, changeLoadState) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore()
        const prodImgs = product.images
        const modProduct = { ...product, images: [] }

        firestore.collection('products').add(modProduct)
            .then(async (docRef) => {
                await uploadImage(product.category, prodImgs, docRef.id, firestore)
                await updateInvertedIndex(firestore, docRef.id,
                    modProduct.productName, modProduct.color, modProduct.desc)
                dispatch(addProduct({
                    ...dataState,
                    isLoading: false,
                    isLoaded: true,
                    data: docRef.id
                }))
                changeLoadState()
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

const isStopWord = (term) => {
    const stopWords = [
        'a', 'an', 'and', 'are', 'about', 'as', 'at', 'again', 'against',
        'be', 'by', 'during', 'for',
        'from', 'how', 'has', 'he', 'in', 'is', 'it', 'its', 'made',
        'of', 'on', 'that', 'the', 'to', 'very', 'was', 'were', 'who', 'when',
        'what', 'where', 'will', 'with', 'your'
    ]

    return stopWords.includes(term)
}

const updateInvertedIndex = async (db, productId, productName, productColor, productDesc) => {
    var lemmatizer = require( 'wink-lemmatizer' );

    // CLEAN - REMOVE PUNCTUATIONS
    const modProductName = productName.trim().replace(/[\W_]+/g, ' ')
    const modProductDesc = productDesc.trim().replace(/[\W_]+/g, ' ')

    // TOKENIZATION
    const tokenizeName = modProductName.split(' ')
    const tokenizeDesc = modProductDesc.split(' ')

    const terms = tokenizeName.concat(tokenizeDesc).concat(productColor)

    //  REMOVE STOP WORDS AND PERFORM LEMMATIZATION
    const uniqueTerms = new Set()
    terms.forEach(term => !isStopWord(term.toLowerCase()) &&
        uniqueTerms.add(lemmatizer.noun(term.toLowerCase())))

    const termRef = collection(db, 'index')

    await Promise.all(Array.from(uniqueTerms).map(async (term) => {
        const termQuery = query(termRef, where('term', '==', term))
        const termQuerySnapshot = await getDocs(termQuery)

        if (!termQuerySnapshot.empty) {
            termQuerySnapshot.forEach(async termDoc => {
                const termDocRef = doc(db, 'index', termDoc.id)
                await updateDoc(termDocRef, {
                    docIDs: firebase.firestore.FieldValue.arrayUnion(productId)
                })
            })
        } else {
            await addDoc(collection(db, 'index'), {
                term,
                docIDs: [productId] // docIDs is the postings list
            })
        }
    }))

}