import React from "react";
import WingLeft from "@/public/images/WingLeft.svg";
import styles from "@/components/form-components/wing.module.scss";

export default function Wing(lang) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "7rem",
        justifyContent: "center",
      }}
    >
      {/*  <WingLeft
        className={styles.wingLeft}
        width="400"
        height="10"
        preserveascpectratio="null"
      /> */}
      <h1 style={{ color: "white" }}>
        {lang === "sv" ? "Information" : "Information"}
      </h1>
      {/*  <WingLeft
        className={styles.wingRight}
        width="400"
        height="10"
        preserveascpectratio="null"
      /> */}
    </div>
  );
}
