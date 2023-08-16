import Link from "next/link";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <div className={styles.menu}>
      <Link href="home">
        Home
      </Link>
      <Link href="status">
        Status
      </Link>
      <Link href="map">
        Map
      </Link>
    </div>
  );
}

export default Menu;
