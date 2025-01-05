"use client";
import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import TabManager from "./Tab";
import AboutTab from "./tabs/AboutTab";
import EventTab from "./tabs/EventTab";
import BlogTab from "./tabs/BlogTab";
import TeamTab from "./tabs/TeamTab";
import TabData from "../interface/TabData";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  // const [page, setPage] = useState("home");
  const { tabs, setTabs } = useContext(AppContext)
  const tabContent = [
    <AboutTab key="0" />,
    <BlogTab key="1" />,
    <TeamTab key="2" />,
    <EventTab key="3" />,
  ];

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
            onClick={() => setCurrTab("/about", 0)}
            className={
              tabs.length != 0 && tabs[tabs.length - 1].id == 0
                ? styles.navItemActive
                : styles.navItem
            }
          >
            /about
          </li>
          <li
            onClick={() => setCurrTab("/blog", 1)}
            className={
              tabs.length != 0 && tabs[tabs.length - 1].id == 1
                ? styles.navItemActive
                : styles.navItem
            }
          >
            /blog
          </li>
          <li
            onClick={() => setCurrTab("/team", 2)}
            className={
              tabs.length != 0 && (tabs[tabs.length - 1].id == 2 || (tabs[tabs.length - 1].id <= 20 && tabs[tabs.length - 1].id>= 7))
                ? styles.navItemActive
                : styles.navItem
            }
          >
            /team
          </li>
          <li
            onClick={() => setCurrTab("/event", 3)}
            className={
              tabs.length != 0 && tabs[tabs.length - 1].id == 3
                ? styles.navItemActive
                : styles.navItem
            }
          >
            /event
          </li>
        </ul>
      </div>

      <TabManager />
    </>
  );
};

export default Navbar;
