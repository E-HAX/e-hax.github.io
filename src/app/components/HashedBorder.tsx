"use client";
import { useEffect, useState } from "react";
import React from "react";
import styles from "./HashedBorder.module.css";

const HashedBorder = ({ children }: { children: React.ReactNode }) => {
  const [dimension, setDimension] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    setDimension({ w, h });
  }, []);

  const HorizontalHash = "# ".repeat(dimension.w / 30);

  const VerticalHash = () => {
    const elements = [];
    for (let i = 0; i < dimension.h/35; i++) {
      elements.push(<p key={i}>{"#"}</p>);
    }
    return <>{elements}</>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.boundaryLeft}><VerticalHash /></div>
      <div className={styles.boundaryRight}><VerticalHash /></div>
      <div className={styles.boundaryTop}>{HorizontalHash}</div>
      <div className={styles.boundaryBottom}>{HorizontalHash}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default HashedBorder;
