import React, { useState } from "react";
import styles from './Content.module.css'
import UserInfo from "@/components/UserInfo";
import { doc,  onSnapshot, updateDoc, } from "firebase/firestore";
import { auth, col } from "@/firebase";

function HomeContent() {

  const [userStatus, setUserStatus] = useState(false);
  const [archivePlace, setArchivePlace] = useState({Lat: 0, Lng: 0});

  const docRef = doc(col, auth.currentUser.uid);
  
  const handleChangeStatus = (e) => {
    updateDoc(docRef, {isInOffice: !userStatus})
    
    if (userStatus) {
      getDoc(docRef).then((doc) => {
        setArchivePlace({Lat: doc.data().placeLat, Lng: doc.data().placeLng});
      });

      updateDoc(docRef, {
        archiveLat: archivePlace.Lat,
        archiveLng: archivePlace.Lng,
      });

      updateDoc(docRef, {isInOffice: false});
    } else {
      updateDoc(docRef, {isInOffice: true});
    };
  };

  onSnapshot(docRef, (doc) => {
      setUserStatus(doc.data().isInOffice);
  });

  return (
    <div className={styles.container}>
      <UserInfo />
      <div className={styles.userStatus}>
        {userStatus ? `出勤中` : `退勤中`}
        <button
        onClick={(e) => handleChangeStatus(e)}
      >
        {!userStatus ? `出勤` : `退勤`}
        </button>
        <h3>退勤予定時刻</h3>
        <p className={styles.goHomeTime}>12:00:00</p>
      </div>
    </div>
  )
}

export default HomeContent;
