import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBv-iCCMF1Kx-b5m0vjPm84pdOxosw8dVM",
    authDomain: "prueba-nuxt-d654b.firebaseapp.com",
    databaseURL: "https://prueba-nuxt-d654b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "prueba-nuxt-d654b",
    storageBucket: "prueba-nuxt-d654b.appspot.com",
    messagingSenderId: "680522184745",
    appId: "1:680522184745:web:bacacb77ccacd60166c438",
    measurementId: "G-S70F7XG0WX"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database()