import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  Id: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const provider = new firebase.auth.GoogleAuthProvider()
