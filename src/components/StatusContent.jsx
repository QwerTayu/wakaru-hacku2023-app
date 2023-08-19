import { useEffect, useState } from 'react';
import styles from './Content.module.css'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

function StatusContent() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
      // データベースからデータを取得する
      const userData = collection(db, "user");
      getDocs(userData).then((snapShot) => {
          // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
          setUsers(snapShot.docs.map((doc) => ({ ...doc.data() })));

          // リアルタイムで取得
          onSnapshot(userData, (user) => {
              setUsers(user.docs.map((doc) => ({ ...doc.data() })));
          });
      });
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.statusOrganization}>明石高専</p>
      <div className={styles.members}>
        {users.map((user) => (
          <div key={user.username} className={styles.member}>
            { user.isInOffice ?
              <p>
                <img src='/userIcon.jpg' alt="" className={styles.face}/>
              </p>
            : 
              <p className={styles.faceWrapper}>
                <img src='/userIcon.jpg' alt="" className={styles.face}/>
              </p>
            }
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusContent;
