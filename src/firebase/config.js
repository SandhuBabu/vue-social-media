import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAly8sYXowh09WajRO6G5jisg1dVGaE2tg",
  authDomain: "social-media-217e3.firebaseapp.com",
  projectId: "social-media-217e3",
  storageBucket: "social-media-217e3.appspot.com",
  messagingSenderId: "149520426635",
  appId: "1:149520426635:web:7cc1511550cf120341968e"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app);