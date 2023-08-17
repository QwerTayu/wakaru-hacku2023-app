import { auth, col } from "@/firebase";
import styles from "./Content.module.css";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

function UserInfo() {
  const [name, setName] = useState("");

  const docRef = doc(col, auth.currentUser.uid);
  getDoc(docRef).then((doc) => {
    setName(doc.data().username);
  });

  return (
    <div className="user-info">
        <img src="/userIcon.jpg" alt="avatar" />
        <p className={styles.organizaion}>明石高専</p>
        <p className={styles.userName}>{name}</p>
    </div>
  );
}

export default UserInfo;