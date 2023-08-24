import React, { useEffect, useState } from "react";
import styles from './Content.module.css'
import UserInfo from "@/components/UserInfo";
import { doc,  getDoc,  getDocs,  onSnapshot, updateDoc, } from "firebase/firestore";
import { auth, col } from "@/firebase";
import StopSharing from "@/components/StopSharing";
import { router } from "next/router";

function HomeContent() {

  const [userStatus, setUserStatus] = useState(false);
  const [archivePlace, setArchivePlace] = useState({Lat: 0, Lng: 0});
  const [goHomeTime, setGoHomeTime] = useState({hour: 23, minute: 59});
  const [users, setUsers] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    if (auth.currentUser) {
      const newDocRef = doc(col, auth.currentUser.uid);
      setDocRef(newDocRef);
      const unsubscribe = onSnapshot(newDocRef, (doc) => {
        setUserStatus(doc.data().isInOffice);
        setGoHomeTime({hour: doc.data().outTimeHour, minute: doc.data().outTimeMinute});
      });
      return () => unsubscribe();
    };
  }, [auth.currentUser]);


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

  setInterval(() => {
    setNowTime(new Date());
  }, 60000);

  useEffect(() => {
    console.log("changed");
    StopSharing(users);
  }, [users, nowTime.getMinutes()]);

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
        if (goHomeTime.hour === 23) {
          updateDoc(docRef, {outTimeHour: 0});
        } else if (goHomeTime.hour < 23) {
          updateDoc(docRef, {outTimeHour: goHomeTime.hour + 1});
        };
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
        if (goHomeTime.hour === 0) {
          updateDoc(docRef, {outTimeHour: 23});
        } else if (goHomeTime.hour > 0) {
          updateDoc(docRef, {outTimeHour: goHomeTime.hour - 1});
        };
      } else if (goHomeTime.minute > 0) {
        updateDoc(docRef, {outTimeMinute: goHomeTime.minute - 1});
      };
    };
  };

  return (
    <div className={styles.container}>
      <p className={styles.nowTime}>
        {String(nowTime.getHours()).padStart(2, '0')}:{String(nowTime.getMinutes()).padStart(2, '0')}
      </p>
      <div className={styles.homeContainer}>
        <UserInfo />
        <div className={styles.userStatus}>
          <div className={styles.userAttendStatus}>
            <p className={styles.userAttendText}>{userStatus ? `出勤中` : `退勤中`}</p>
            <button
            onClick={(e) => handleChangeStatus(e)}
            className={styles.userAttendButton}
            >
            {!userStatus ? `出勤` : `退勤`}
            </button>
          </div>
          <p className={styles.goHomeFont}>退勤予定時刻</p>
          <div className={styles.goHome}>
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
            <p className={styles.goHomeTime}>
              {String(goHomeTime.hour).padStart(2, '0')}:{String(goHomeTime.minute).padStart(2, '0')}
            </p>
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
    </div>
  )
}

export default HomeContent;
