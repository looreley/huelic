 import firebase from 'firebase/app'

  const firebaseConfig = {
    apiKey: "AIzaSyCUgIb9bxQmjW_DZOYTzTY1pBUu5Hokirc",
    authDomain: "huelic-7a178.firebaseapp.com",
    projectId: "huelic-7a178",
    storageBucket: "huelic-7a178.appspot.com",
    messagingSenderId: "623501415798",
    appId: "1:623501415798:web:c01d45bf2cce4c67b71657"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)
