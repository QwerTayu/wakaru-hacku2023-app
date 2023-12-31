import Link from "next/link";
import styles from "./Header.module.css";
import { logOut } from "@/firebase";

function Header() {
  return (
    <div className={styles.header}>
      <p className={styles.title}>WAKARU</p>
      <div className={styles.buttons}>
        <button type={'button'} onClick={logOut} className={styles.logout}>
          <p>Log</p>
          <p>out</p>
        </button>
        <Link href="/setting" legacyBehavior>
          <a className={styles.setting}>
            <img src="/userIcon.png" alt="Setting" />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Header;
