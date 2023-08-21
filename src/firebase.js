import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, deleteUser, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateCurrentUser } from "firebase/auth";
import { router } from "next/router";

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
    
    if (auth.currentUser.emailVerified) {
    } else {
      await signOut(auth);
    };

    return user;
  } catch (error) {
    alert("failed to create user");
    console.log(error);
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser.emailVerified) {
      router.push('/home');
      return user;
    } else {
      await reSendVerifyMail(user.user)
      await signOut(auth);
    }
    router.push('/');
    return false;
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        await signOut(auth);
        alert("ユーザが存在しません。");
        return false;
      case "auth/invalid-email":
        await signOut(auth);
        alert("メールアドレスの形式が正しくありません。");
        return false;
      case "auth/wrong-password":
        await signOut(auth);
        alert("パスワードが間違っています。");
	      return false;
      default:
        await signOut(auth);
        alert("ログインに失敗しました。");
        return false;
    }
  }
}

async function reSendVerifyMail(user) {
  try {
    if (user) {
      await sendEmailVerification(user);
      alert("認証メールを再送信しました。確認してください。");
    }
    return
  } catch (error) {
    switch (error.code) {
      case "auth/too-many-requests":
        alert("1分以内に複数回送信することはできません。時間をおいて再度お試しください。") 
        // 1分以内は再送できずこのエラーになる.その時の処理.
	    break
      default:
        // その他のメール送信失敗時の処理
    }
    return
  }
};


const logOut = async () => {
  try {
    await signOut(auth);
    console.log(auth.currentUser);
  } catch (error) {
    alert("failed to sign out user");
    console.log(error);
  }
}

const deleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "user", auth.currentUser.uid));
  } catch (error) {
    alert("failed to delete doc");
    console.log(error);
  }
}

const deleteAccount = async () => {
  try {
    await deleteUser(auth.currentUser);
  } catch (error) {
    alert("failed to delete account");
    console.log(error);
  }
}

export { db, auth, col, signUpWithEmailAndPassword, logInWithEmailAndPassword, logOut, deleteDocument, deleteAccount };