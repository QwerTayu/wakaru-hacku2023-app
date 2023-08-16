import React, { useState } from "react";
import styles from './Content.module.css'
import UserInfo from "@/components/UserInfo";

function HomeContent() {

  const [userStatus, setUserStatus] = useState(false)

  return (
    <div className={styles.container}>
    <UserInfo />
    <div className={styles.userStatus}>
      {userStatus ? `出勤中` : `退勤中`}
      <button
      onClick={(e) => setUserStatus(!userStatus)}
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
