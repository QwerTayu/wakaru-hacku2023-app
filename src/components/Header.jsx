import Link from "next/link";
import styles from "./Header.module.css";
import { logOut } from "@/firebase";

function Header() {
  return (
    <div className={styles.header}>
      WAKARU
      <button type={'button'} onClick={logOut} className={styles.logout}>Logout</button>
      <Link href="/account">
        アカウント
      </Link>
    </div>
    );
}

export default Header;
