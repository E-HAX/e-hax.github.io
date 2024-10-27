import React from 'react'
import styles from "./Button.module.css"

interface Props {
    className?: string
    children: React.ReactNode
    type?: "solid" | "outline"
}

const Button = ({ children, className, type="solid" }: Props) => {
  return (
    <button className={`${styles.btn} ${styles["btn_"+type]} ${className}`}>
        {children}
    </button>
  )
}

export default Button