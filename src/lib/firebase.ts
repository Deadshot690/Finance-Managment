import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// =================================================================================
// IMPORTANT: REPLACE WITH THE NEW OWNER'S FIREBASE PROJECT CONFIG
// =================================================================================
const firebaseConfig = {
  apiKey: "REPLACE_WITH_NEW_OWNER_API_KEY",
  authDomain: "REPLACE_WITH_NEW_OWNER_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_NEW_OWNER_PROJECT_ID",
  storageBucket: "REPLACE_WITH_NEW_OWNER_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_NEW_OWNER_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_NEW_OWNER_APP_ID",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
