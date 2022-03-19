import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Auth
const firebaseConfig = {
  apiKey: "AIzaSyDjnToWEWYbPjyEdChYJjRtGH8dWJl1VdU",
  authDomain: "crwn-db-f9f51.firebaseapp.com",
  projectId: "crwn-db-f9f51",
  storageBucket: "crwn-db-f9f51.appspot.com",
  messagingSenderId: "140367041969",
  appId: "1:140367041969:web:4810a3b498dcf861251990",
  measurementId: "G-8WGHR11HZ2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// console.log(firebaseApp);

// Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
