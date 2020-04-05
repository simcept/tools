import Vue from 'vue'

import * as firebase from 'firebase/app'

// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/firestore'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

Vue.prototype.$fireStoreObj = firebase.firestore
Vue.prototype.$fireStore = firebase.firestore()
