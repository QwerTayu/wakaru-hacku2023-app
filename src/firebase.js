import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateCurrentUser } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const col = collection(db, "user");

const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);    
    
    alert("user created successfully")

    return user;
  } catch (error) {
    alert("failed to create user");
    console.log(error);
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    alert("user signed in successfully")

    return user;
  } catch (error) {
    alert("failed to sign in user");
    console.log(error);
  }
}


const logOut = async () => {
  try {
    await signOut(auth);
    console.log(auth.currentUser);
    alert("user signed out successfully")
  } catch (error) {
    alert("failed to sign out user");
    console.log(error);
  }
}

export { db, auth, col, signUpWithEmailAndPassword, logInWithEmailAndPassword, logOut};