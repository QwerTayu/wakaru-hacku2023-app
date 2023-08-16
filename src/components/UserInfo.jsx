import { auth } from "@/firebase";
import styles from "./Content.module.css";

function UserInfo() {
  return (
    <div className="user-info">
        <img src="/userIcon.jpg" alt="avatar" />
        <p className={styles.organizaion}>明石高専</p>
        <p className={styles.userName}>{auth.currentUser.email}</p>
    </div>
  );
}

export default UserInfo;