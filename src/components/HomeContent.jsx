import React, { useEffect, useState } from "react";
import styles from './Content.module.css'
import UserInfo from "@/components/UserInfo";
import { doc,  getDoc,  getDocs,  onSnapshot, updateDoc, } from "firebase/firestore";
import { auth, col } from "@/firebase";
import StopSharing from "@/components/StopSharing";

function HomeContent() {

  const [userStatus, setUserStatus] = useState(false);
  const [archivePlace, setArchivePlace] = useState({Lat: 0, Lng: 0});
  const [goHomeTime, setGoHomeTime] = useState({hour: 23, minute: 59});
  const [users, setUsers] = useState([]);

  const docRef = doc(col, auth.currentUser.uid);
  

  onSnapshot(docRef, (doc) => {
    setUserStatus(doc.data().isInOffice);
    setGoHomeTime({hour: doc.data().outTimeHour, minute: doc.data().outTimeMinute});
  });

  useEffect(() => {
      // データベースからデータを取得する
      const userData = col;
      getDocs(userData).then((snapShot) => {
          // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
          setUsers(snapShot.docs.map((doc) => ({ ...doc.data() })));

          // リアルタイムで取得
          onSnapshot(userData, (user) => {
              setUsers(user.docs.map((doc) => ({ ...doc.data() })));
          });
      });
  }, []);

  StopSharing(users);

  const handleChangeStatus = (e) => {
    
    if (userStatus) {

      updateDoc(docRef, {isInOffice: false});
      
      getDoc(docRef).then((doc) => {
        setArchivePlace({Lat: doc.data().placeLat, Lng: doc.data().placeLng});
      });

      updateDoc(docRef, {
        archiveLat: archivePlace.Lat,
        archiveLng: archivePlace.Lng,
      });

      
    } else {
      updateDoc(docRef, {isInOffice: true});
    };

  };

  const handleClickUp = (e) => {
    const time = e.target.parentNode.className;
    console.log(time);
    if (time.match(/goHomeTimeHour/)) {
      if (goHomeTime.hour === 23) {
        updateDoc(docRef, {outTimeHour: 0});
      } else if (goHomeTime.hour < 23) {
        updateDoc(docRef, {outTimeHour: goHomeTime.hour + 1});
      };
    } else if (time.match(/goHomeTimeMinute/)) {
      if (goHomeTime.minute === 59) {
        updateDoc(docRef, {outTimeMinute: 0});
      } else if (goHomeTime.minute < 59) {
        updateDoc(docRef, {outTimeMinute: goHomeTime.minute + 1});
      };
    };
  };

  const handleClickDown = (e) => {
    const time = e.target.parentNode.className;
    console.log(time);
    if (time.match(/goHomeTimeHour/)) {
      if (goHomeTime.hour === 0) {
        updateDoc(docRef, {outTimeHour: 23});
      } else if (goHomeTime.hour > 0) {
        updateDoc(docRef, {outTimeHour: goHomeTime.hour - 1});
      };
    } else if (time.match(/goHomeTimeMinute/)) {
      if (goHomeTime.minute === 0) {
        updateDoc(docRef, {outTimeMinute: 59});
      } else if (goHomeTime.minute > 0) {
        updateDoc(docRef, {outTimeMinute: goHomeTime.minute - 1});
      };
    };
  };

  return (
    <div className={styles.container}>
    <UserInfo />
      <div className={styles.userStatus}>
        <div className={styles.userAttendStatus}>
          {userStatus ? `出勤中` : `退勤中`}
          <button
          onClick={(e) => handleChangeStatus(e)}
          className={styles.userAttendButton}
          >
          {!userStatus ? `出勤` : `退勤`}
          </button>
        </div>
        <div className={styles.goHome}>
          <p className={styles.goHomeFont}>退勤予定時刻</p>
          <p className={styles.goHomeTime}>{goHomeTime.hour}:{goHomeTime.minute}</p>
          <div className={styles.goHomeTimeHour}> {/* ここのクラス名変更禁止 */}
            <button 
              onClick={(e) => handleClickUp(e)}
              className={styles.goHomeTimeUp}
            >
              ▲
            </button>
            <button 
              onClick={(e) => handleClickDown(e)}
              className={styles.goHomeTimeDown}
            >
              ▼
            </button>
          </div>
          <div className={styles.goHomeTimeMinute}> {/* ここのクラス名変更禁止 */}
            <button 
              onClick={(e) => handleClickUp(e)}
              className={styles.goHomeTimeUp}
            >
              ▲
            </button>
            <button 
              onClick={(e) => handleClickDown(e)}
              className={styles.goHomeTimeDown}
            >
              ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeContent;
