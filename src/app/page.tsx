import { FaDiscord } from "react-icons/fa";
import Button from "./components/Button";
import styles from "./page.module.css";

export default function Home() {


  return (
      <div className={styles.main}>

        <div className={styles.content}>
          <h1 className={styles.header}>Welcome to EHAX.</h1>
          <p className={styles.desc}>the official ethical hacking and cybersecurity society of DTU</p>
          <a href="https://discord.gg/ZahW64GeWB" target="__blank" className={styles.discordlink} draggable={false}>
          <Button className={styles.discordbtn}><FaDiscord size={25} /> Enter Discord!</Button>
          </a>
        </div>

        {/* <div className={styles.about}>
          <h2 className={styles.about}>About</h2>
        </div> */}
      </div>


  );
}
