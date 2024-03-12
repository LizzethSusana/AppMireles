import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCqZ0A06vSx7Olt9h_LJaMGeTtLOpilcuk",
    authDomain: "restauranteagles-b4e14.firebaseapp.com",
    projectId: "restauranteagles-b4e14",
    storageBucket: "restauranteagles-b4e14.appspot.com",
    messagingSenderId: "537323609347",
    appId: "1:537323609347:web:c32ab6dcb09bc93f2ddd36"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

const storage = getStorage(app);


export {app,auth,db,storage}