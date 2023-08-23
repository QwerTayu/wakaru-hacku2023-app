import { useEffect, useState } from 'react';
import styles from './Content.module.css'
import { getDocs, onSnapshot } from 'firebase/firestore';
import { col, db } from '@/firebase';
import StopSharing from '@/components/StopSharing';

function StatusContent() {

  const [users, setUsers] = useState([]);
  const nowTime = new Date();

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

  // StopSharing(users);

  useEffect(() => {
    StopSharing(users);
  }, [users, nowTime.getMinutes()]);

  return (
    <div className={styles.container}>
      <p className={styles.statusOrganization}>MuTech部(笑)</p>
      <div className={styles.members}>
        {users.map((user) => (
          <div key={user.username} className={styles.member}>
            { user.isInOffice ?
              <p>
                <img src='/userIcon.png' alt="" className={styles.face}/>
              </p>
            : 
              <p className={styles.faceWrapper}>
                <img src='/userIcon.png' alt="" className={styles.faceWrapped}/>
              </p>
            }
            <div className={styles.memberInfo}>
              <p>{user.username.substring(0, 5)}</p>
              <p>-{user.outTimeHour}:{user.outTimeMinute}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusContent;
