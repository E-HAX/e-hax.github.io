"use client"
import { AppContext } from "@/app/context/AppContext";
import React, { useContext } from "react";
import styles from "./EventTab.module.css"

const EventTab = () => {

  const { data } = useContext(AppContext)
  const { events } = data;
    
  return (
    <div>
      {
        events ?
        events.map(event => (
          <div key={event.name} className={styles.event}>
            <h4>{event.name}</h4>
            <p>{event.date}</p>
            <p>{event.about}</p>
            <a href={event.link} target="___blank">Know More</a>
          </div>
        ))
        :
        <p className={styles.text}>No events yet</p>
      }
    </div>
  );
};

export default EventTab;
