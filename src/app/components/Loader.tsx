"use client"
import React, { useEffect, useState } from 'react'
import styles from "./Loader.module.css"

const Loader = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false),2500)
    }, [])

    if (loading) {
        return <div className={styles.loading}><div className={styles.loader}></div></div>
    }

  return (
    <>{children}</>
  )
}

export default Loader