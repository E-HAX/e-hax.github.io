import { FaDiscord } from "react-icons/fa";
import Button from "./components/Button";
import styles from "./page.module.css";
import { GoAlertFill } from "react-icons/go";
// import { GoAlertFill } from "react-icons/go";

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
        
        <a href="https://www.linkedin.com/posts/ehax_pentathon-2025-rank-12-team-ehax-dtu-activity-7326674826369077248-cPuz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE33SAkBH8R2J2iAp96SOdAxTpRScWDd1Y0" target="__blank" className={styles.recAlertLink}>
          <div className={styles.recAlert}>
            <div className={styles.recAlertlogo}>
              <GoAlertFill fontSize={35} color="#00ff04" />
            </div>
            <div>
              <h3>{"EHAX AIR 12 at Pentathon !!!"}</h3>
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
