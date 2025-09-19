import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "studio-3042253082-6d7cc",
  appId: "1:369809817037:web:e65448f1d38d0a0435d884",
  apiKey: "AIzaSyBrxaBrJ6dNQ_rhKmdMFYq3V13xeLrwr8U",
  authDomain: "studio-3042253082-6d7cc.firebaseapp.com",
  storageBucket: "studio-3042253082-6d7cc.appspot.com",
  messagingSenderId: "369809817037",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
