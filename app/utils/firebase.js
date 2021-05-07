 import firebase from 'firebase/app'

  const firebaseConfig = {
    apiKey: "AIzaSyD51Rn3kBBZom5_YnkCU1IeamklSCRUQPc",
    authDomain: "huelic.firebaseapp.com",
    projectId: "huelic",
    storageBucket: "huelic.appspot.com",
    messagingSenderId: "724407829381",
    appId: "1:724407829381:web:44845e670bb94303683aec"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)
