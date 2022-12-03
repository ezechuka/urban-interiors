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
import { Router } from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'

firebase.initializeApp(firebaseConfig)
firebase.firestore()

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
  NProgress.configure({ showSpinner: true });

  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });

  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </Head>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <PersistGate loading={null} persistor={persistor}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PersistGate>
          </ReactReduxFirebaseProvider>
        </ChakraProvider>
      </Provider>
    </>
  )
}

export default MyApp