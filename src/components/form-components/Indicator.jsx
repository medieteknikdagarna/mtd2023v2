import React from "react";
import styles from "@/components/form-components/indicator.module.scss";
export default function Indicator({ color, text }) {
  return (
    <div className={styles.indicatorContainer}>
      <div
        className={styles.indicator}
        style={{ backgroundColor: color }}
      ></div>
      <h4>{text}</h4>
    </div>
  );
}
