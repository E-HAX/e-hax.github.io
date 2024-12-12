import { FaDiscord } from "react-icons/fa";
import Button from "./components/Button";
import styles from "./page.module.css";
import { GoAlertFill } from "react-icons/go";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.header}>Welcome to EHAX.</h1>
        <p className={styles.desc}>
          the official ethical hacking and cybersecurity society of DTU
        </p>
        <a
          href="https://discord.gg/ZahW64GeWB"
          target="__blank"
          className={styles.discordlink}
          draggable={false}
        >
          <Button className={styles.discordbtn}>
            <FaDiscord size={25} /> Enter Discord!
          </Button>
        </a>

        <a className={styles.recAlertLink} href="https://chat.whatsapp.com/IBLzrx3MTvwJQOZ30WLyAU">
          <div className={styles.recAlert}>
            <div className={styles.recAlertlogo}>
              <GoAlertFill fontSize={35} color="#00ff04" />
            </div>
            <div>
              <h3>Recruitement CTF on 12 Jan!!!</h3>
            </div>
          </div>
        </a>
      </div>

      {/* <div className={styles.about}>
          <h2 className={styles.about}>About</h2>
        </div> */}
    </div>
  );
}
