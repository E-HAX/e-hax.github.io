"use client";
import { useEffect, useState } from "react";
import React from "react";
import styles from "./HashedBorder.module.css";

const HashedBorder = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    setSize({ w, h });
  }, []);

  const HorizontalHash = "# ".repeat(size.w / 34);

  const VerticalHash = () => {
    const elements = [];
    for (let i = 0; i < size.h / 42; i++) {
      elements.push(<p key={i}>{"#"}</p>);
    }
    return <>{elements}</>;
  };

  return (
    <div className={styles.container}>
      {
        size.w > 600 && (
          <>
            <div className={`${styles.boundaryLeft} vertical-hashes`}>
              <VerticalHash />
            </div>
            <div className={`${styles.boundaryRight} vertical-hashes`}>
              <VerticalHash />
            </div>
            <div className={`${styles.boundaryTop} horizontal-hashes`}>{HorizontalHash}</div>
            <div className={`${styles.boundaryBottom} horizontal-hashes`}>{HorizontalHash}</div>
          </>
        )
      }
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default HashedBorder;
