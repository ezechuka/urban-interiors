/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: process.env.NEXT_APP_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_APP_FIREBASE_AUTHDOMAIN,
    projectID: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderID: process.env.NEXT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appID: process.env.NEXT_APP_FIREBASE_APP_ID,
    measurementID: process.env.NEXT_APP_FIREBASE_MEASUREMENT_ID,
    paystackPublicKey: process.env.NEXT_APP_PAYSTACK_PUBLIC_KEY
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
}

module.exports = nextConfig
