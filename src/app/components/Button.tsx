import React from 'react'
import styles from "./Button.module.css"

interface Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: React.ReactNode
    type?: "solid" | "outline"
}

const Button = ({ children, className, type="solid", ...props  }: Props) => {
  return (
    <button className={`${styles.btn} ${styles["btn_"+type]} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button