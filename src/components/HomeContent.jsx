import React, { useState } from "react";
import styles from './Content.module.css'
import UserInfo from "@/components/UserInfo";
import { doc,  getDoc,  onSnapshot, updateDoc, } from "firebase/firestore";
import { auth, col } from "@/firebase";

function HomeContent() {

  const [userStatus, setUserStatus] = useState(false);
  const [archivePlace, setArchivePlace] = useState({Lat: 0, Lng: 0});
  const [goHomeTime, setGoHomeTime] = useState({hour: 23, minute: 59});

  const docRef = doc(col, auth.currentUser.uid);
  
  const [users, setUsers] = useState([]);

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

  onSnapshot(docRef, (doc) => {
      setUserStatus(doc.data().isInOffice);
      setGoHomeTime({hour: doc.data().outTimeHour, minute: doc.data().outTimeMinute});
  });

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
        <p className={styles.goHomeFont}>退勤予定時刻</p>
      <p className={styles.goHomeTime}>{goHomeTime.hour}:{goHomeTime.minute}</p>
      </div>
    </div>
  )
}

export default HomeContent;
