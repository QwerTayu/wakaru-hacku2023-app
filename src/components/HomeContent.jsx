import React, { useState } from "react";
import styles from './Content.module.css'
import UserInfo from "@/components/UserInfo";

function HomeContent() {

  const [userStatus, setUserStatus] = useState(false)

  return (
    <div className={styles.container}>
    <UserInfo />
      <div className={styles.userStatus}>
        <div className={styles.userAttendStatus}>
          {userStatus ? `出勤中` : `退勤中`}
          <button
          onClick={(e) => setUserStatus(!userStatus)}
          className={styles.userAttendButton}
          >
          {!userStatus ? `出勤` : `退勤`}
          </button>
        </div>
        <p className={styles.goHomeFont}>退勤予定時刻</p>
        <p className={styles.goHomeTime}>12:00:00</p>
      </div>
    </div>
  )
}

export default HomeContent;
