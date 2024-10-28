import React, { useContext } from "react";
import styles from "./TeamTab.module.css";
import { AppContext } from "@/app/context/AppContext";
import TabData from "@/app/interface/TabData";

const TeamTab = () => {
  const { tabs, setTabs, data } = useContext(AppContext);
  const { members } = data;

  const setCurrTab = (title: string, id: number, about: string) => {
    // setPage(page);
    const tab_to_add = { id, title, about };
    const tabs_without_current: TabData[] = [];
    tabs.forEach((tab) => {
      if (tab.id != tab_to_add.id) {
        tabs_without_current.push(tab);
      }
    });

    setTabs([...tabs_without_current, tab_to_add]);
  };

  return (
    <div className={styles.nameList}>
      {members.map((member) => (
        <p
          onDoubleClick={() => setCurrTab(`/team/${member.username}`, 7, member.about)}
          key={member.id}
        >
          {`${member.username} - ${member.name}`}
        </p>
      ))}
    </div>
  );
};

export default TeamTab;
