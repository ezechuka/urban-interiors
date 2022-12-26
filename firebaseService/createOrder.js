import firebase from 'firebase/compat/app'
import { addDoc, collection } from 'firebase/firestore'

export const createOrder = async (userId, userInfo, totalPrice, items) => {
    const firestore = firebase.firestore()

    const orderRef = await addDoc(
        collection(firestore, 'users', userId, 'orders'), {
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            totalPrice: totalPrice,
            phone: userInfo.phone,
            email: userInfo.email,
            fullname: userInfo.fullname,
            state: userInfo.state,
            city: userInfo.city,
            items: items
        })
}