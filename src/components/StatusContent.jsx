import { useEffect, useState } from 'react';
import styles from './Content.module.css'
import { getDocs, onSnapshot } from 'firebase/firestore';
import { col } from '@/firebase';
import StopSharing from '@/components/StopSharing';

function StatusContent() {

  const [users, setUsers] = useState([]);
  const [nowTime, setNowTime] = useState(new Date());
  
  useEffect(() => {
      // データベースからデータを取得する
      const userData = col;
      getDocs(userData).then((snapShot) => {
          // リアルタイムで取得
          onSnapshot(userData, (user) => {
              const updatedUserDataArray = user.docs.map((doc) => ({ ...doc.data() }));

              // 現在のユーザー情報を取得
              const currentUserData = updatedUserDataArray.find(user => user.username === auth.currentUser.email);

              // ユーザーリストを並び替え、現在のユーザーを一番上に持ってくる
              const sortedUsers = updatedUserDataArray.filter(user => user.username !== auth.currentUser.email);

              setUsers([currentUserData, ...sortedUsers]);
          });
      });
  }, []);

  setInterval(() => {
    setNowTime(new Date());
  }, 1000);

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
              <p>
                -{String(user.outTimeHour).padStart(2, '0')}:{String(user.outTimeMinute).padStart(2, '0')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusContent;
