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
    <div className={styles.userInfo}>
        <img src="/userIcon.png" alt="avatar" className={styles.userImage}/>
        <p className={styles.userOrganization}>明石高専</p>
        <p className={styles.userName}>{name.substring(0, 5)}</p>
    </div>
  );
}

export default UserInfo;