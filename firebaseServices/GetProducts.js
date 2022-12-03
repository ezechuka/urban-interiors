import firebase from 'firebase/compat/app'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { fetchProducts } from '../store/productReducer'

export const getProducts = async (path) => {
    const result = []
    const firestore = firebase.firestore()
    const productRef = collection(firestore, 'products')
    const productQuery = query(productRef, where('category', '==', path))

    const querySnapshot = await getDocs(productQuery)
    querySnapshot.forEach((product) => {
        result.push({
            id: product.id,
            ...product.data()
        })
    })

    return result
}