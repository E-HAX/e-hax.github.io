"use state";
import React, { useContext, useState } from "react";
import styles from "./Tab.module.css";
import TabData from "../interface/TabData";
import { AppContext } from "../context/AppContext";
import Button from "./Button";
import { FaLink } from "react-icons/fa";

interface TabWindowProps {
  curr: TabData;
  tabs: TabData[];
  setTabs: React.Dispatch<React.SetStateAction<TabData[]>>;
}

const TabWindow = ({ curr, tabs, setTabs }: TabWindowProps) => {
  const [position, setPosition] = useState({
    x: Math.random() * 200,
    y: Math.random() * 200,
  }); // Initial position of the window
  const [isDragging, setIsDragging] = useState(false); // Whether the window is being dragged
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset of the mouse relative to the window

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const tabs_without_current: TabData[] = [];
    tabs.forEach((t) => {
      if (t.id != curr.id) {
        tabs_without_current.push(t);
      }
    });
    setTabs([...tabs_without_current, curr]);
    // setTabs([{ id, title }, ...tabs_without_current])
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const closeTab = () => {
    const tabs_without_current: TabData[] = [];
    tabs.forEach((t) => {
      if (t.id != curr.id) {
        tabs_without_current.push(t);
      }
    });
    setTabs(tabs_without_current);
  };

  return (
    <div
      style={
        window.innerWidth > 700
          ? {
              top: `${position.y}px`,
              left: `${position.x}px`,
            }
          : {}
      }
      onMouseLeave={() => setIsDragging(false)}
      className={styles.tab}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.tabTop}>
        <h3 className={styles.tabHead}>{curr.title}</h3>
        <span className={styles.tabClose} onClick={closeTab}>
          x
        </span>
      </div>

      <div className={styles.tabContent}>
        {curr.content ? (
          curr.content
        ) : curr.member ? (
          <>
            <pre style={{ fontSize: "14px" }}>
              <code>
                {curr.member.ascii_art}
                <br />
                <br />
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >{`>>> ${curr.member.name}`}</p>
                <p
                  style={{ fontSize: "14px" }}
                >{`Position: ${curr.member.position}`}</p>
                <br />
                <br />
                <p style={{ fontSize: "15px" }}>{curr.member.about}</p>
              </code>
            </pre>
            <br />
            <br />
            {curr.member.link && (
              <a href={curr.member.link} target="__blank" style={{ textDecoration: "none" }}>
                <Button
                  style={{
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <FaLink size={18} style={{ marginRight: "5px" }} /> <span>{curr.member.linkText}</span>
                </Button>
              </a>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const TabManager = () => {
  const { tabs, setTabs } = useContext(AppContext);

  return (
    <>
      {tabs.map((tab) => (
        <TabWindow key={tab.id} curr={tab} tabs={tabs} setTabs={setTabs} />
      ))}
    </>
  );
};

export default TabManager;
