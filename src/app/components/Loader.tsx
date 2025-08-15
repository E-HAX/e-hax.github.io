"use client"
import React, { useContext } from 'react'
import styles from "./Loader.module.css"
import { AppContext } from '../context/AppContext';

const Loader = ({ children }: { children: React.ReactNode }) => {
    const { loading } = useContext(AppContext);


    if (loading) {
        return <div className={styles.loading}><div className={styles.loader}></div></div>
    }

  return (
    <>{children}</>
  )
}

export default Loader