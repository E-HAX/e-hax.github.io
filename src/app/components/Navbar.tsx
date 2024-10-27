"use client";
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import TabManager from "./Tab";

interface TabData {
  id: number;
  title: string;
  content: React.ReactNode;
}

const AboutTab = () => {
  return (
    <div style={{ fontSize: "15px", textAlign: "center" }}>
      <br />
      <pre>
        <code>{`███████╗██╗  ██╗ █████╗ ██╗  ██╗\n██╔════╝██║  ██║██╔══██╗╚██╗██╔╝\n█████╗  ███████║███████║ ╚███╔╝ \n██╔══╝  ██╔══██║██╔══██║ ██╔██╗ \n███████╗██║  ██║██║  ██║██╔╝ ██╗\n╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝`}</code>
      </pre>

      <br />
      <br />

      <p>EHAX is the official ethical hacking and cybersecurity society of DTU and its their official website</p>
    </div>
  )
}
const Navbar = () => {
  // const [page, setPage] = useState("home");
  const [tabs, setTabs] = useState<TabData[]>([
    // { id: 1, title: "About", content: (<>Hello everyone</>)},
    // { id: 2, title: "Contact", content: (<></>) },
  ]);

  const tabContent = [<p key="0">home</p>, <AboutTab key="1" />, <p key="2">team</p>, <p key="3">contact</p>];

  const setCurrTab = (page: string, id: number) => {
    // setPage(page);
    const tab_to_add = { id, title: page, content: tabContent[id] };
    const tabs_without_current: TabData[] = [];
    tabs.forEach((tab) => {
      if (tab.id != tab_to_add.id) {
        tabs_without_current.push(tab);
      }
    });

    setTabs([...tabs_without_current, tab_to_add]);
  };

  return (
    <>
      <div className={styles.navbar}>
        <ul className={styles.navList}>
          <li
            // onDoubleClick={() => setCurrTab("home", 0)}
            className={
              tabs.length == 0 || tabs[tabs.length - 1].id == 0
                ? styles.navItemActive
                : styles.navItem
            }
          >
            /home
          </li>
          <li
            onClick={() => setCurrTab("about", 1)}
            className={
              tabs.length != 0 && tabs[tabs.length - 1].id == 1
                ? styles.navItemActive
                : styles.navItem
            }
          >
            /about
          </li>
          <li
            onClick={() => setCurrTab("team", 2)}
            className={
              tabs.length != 0 && tabs[tabs.length - 1].id == 2
                ? styles.navItemActive
                : styles.navItem
            }
          >
            /team
          </li>
          <li
            onClick={() => setCurrTab("contact", 3)}
            className={
              tabs.length != 0 && tabs[tabs.length - 1].id == 3
                ? styles.navItemActive
                : styles.navItem
            }
          >
            /contact
          </li>
        </ul>
      </div>

      <TabManager tabs={tabs} setTabs={setTabs} />
    </>
  );
};

export default Navbar;
