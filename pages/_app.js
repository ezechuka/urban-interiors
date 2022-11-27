import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/plus-jakarta-sans/800.css'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { createFirestoreInstance } from 'redux-firestore'

import { theme } from '../styles/theme'
import { firebaseConfig } from '../firebase'
import { persistor, store } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

firebase.initializeApp(firebaseConfig)

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ReactReduxFirebaseProvider>
        </PersistGate>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp