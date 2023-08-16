import Link from "next/link";
import styles from "./Header.module.css";
import { logOut } from "@/firebase";

function Header() {
  return (
    <div className={styles.header}>
      Header
      <div className={styles.logout}>
          <button type={'button'} onClick={logOut}>ログアウト</button>
      </div>
    </div>
    );
}

export default Header;
