import React from "react"
import styles from "./loader.module.css"

type Props = {
  text?: string
  showText?: boolean
}

const Loader = ({ text = "Loading...", showText = true }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className={styles.loader}></span>
      {showText && (
        <h3 className="text-lg font-semibold text-body italic">{text}</h3>
      )}
    </div>
  )
}

export default Loader
