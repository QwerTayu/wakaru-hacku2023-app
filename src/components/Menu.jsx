import Link from "next/link";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <div className={styles.menu}>
        <Link href="map">
            Map
        </Link>
        <Link href="status">
            Status
        </Link>
    </div>
  );
}

export default Menu;
