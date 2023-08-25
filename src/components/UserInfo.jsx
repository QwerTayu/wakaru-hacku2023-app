import { auth, col } from "@/firebase";
import styles from "./Content.module.css";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function UserInfo() {
  const [name, setName] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(col, auth.currentUser.uid);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setName(doc.data().username);
        } else {
          setName("No such document!");
        }
      });
      return () => unsubscribe();
    };
  }, [auth.currentUser]);

  return (
    <div className={styles.userInfo}>
        <img src="/userIcon.png" alt="avatar" className={styles.userImage}/>
        <p className={styles.userOrganization}>MuTech部(笑)</p>
        <p className={styles.userName}>{name.substring(0, 5)}</p>
    </div>
  );
}

export default UserInfo;