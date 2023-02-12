import { createSlice } from "@reduxjs/toolkit"

import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";

const dataState = {
    isLoading: true,
    isFetching: false,
    isLoaded: false,
    error: null,
    data: []
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: dataState,
    reducers: {
        search(state, action) {
            return action.payload
        }
    }
})

export const { search } = searchSlice.actions

export default searchSlice.reducer

export const searchProducts = (searchTerm) => {
    return async (dispatch, getState, { getFirebase }) => {
        dispatch(search({
            ...dataState, isFetching: true
        }))

        const firestore = getFirebase().firestore()
        try {
            const tokenizeSearchTerm = searchTerm.split(' ')
            const docIDs = new Set()
            await Promise.all(tokenizeSearchTerm.map(async (token) => {
                const searchResultSnapshot = await getDocs(query(collection(firestore, 'index'),
                    where('term', '==', token)))

                if (!searchResultSnapshot.empty) {
                    searchResultSnapshot.forEach(searchResultID => {
                        const arrayID = searchResultID.get('docIDs')
                        arrayID.forEach(id => docIDs.add(id))
                    })
                }
            }))

            const searchResultID = Array.from(docIDs)
            const searchResultName = []
            await Promise.all(searchResultID.map(async (id) => {
                const productRef = doc(firestore, 'products', id)
                const docSnap = await getDoc(productRef)
                if (docSnap.exists()) {
                    searchResultName.push({
                        prodName: docSnap.get('productName'),
                        prodImage: docSnap.get('images')[0]
                    })
                }

            }))

            dispatch(search({
                ...dataState,
                isLoading: false,
                isFetching: false,
                isLoaded: true,
                data: searchResultName
            }))
        } catch (e) {
            dispatch(search({
                ...dataState,
                isLoading: false,
                isFetching: false,
                error: e,
                data: null
            }))
        }
    }
}