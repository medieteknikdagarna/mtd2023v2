import React from "react";
import styles from "@/components/form-components/other.module.scss";

export default function Other({ register, lang, errors }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 id={styles.underLine}>{lang === "sv" ? "Övrigt" : "Other"}</h2>
      <div style={{ display: "flex", flexFlow: "column" }}>
        <span>
          {lang === "sv"
            ? "Infoga logotyp för app och webb (.eps eller .svg)"
            : "Attach logo for usage in the app or on the website (.eps or .svg)"}
        </span>
        <label htmlFor="logotyp" />
        <input
          style={{ color: "#fff" }}
          type="file"
          id="logotyp"
          {...register("logotyp", {
            required: {
              value: true,
              message: `${
                lang === "sv" ? "Obligatoriskt" : "Must be filled in"
              }`,
            },
          })}
        />
        <p className={styles.error}>{errors.logotyp?.message}</p>
      </div>
      <div style={{ display: "flex", flexFlow: "column" }}>
        <h3 style={{ color: "white" }}>
          {lang === "sv" ? "Fakturerinsuppgifter" : "Billing information"}
        </h3>
        <span>
          {lang === "sv"
            ? "Vilken e-postadress ska fakturan skickas till?"
            : "What email adress should the invoice be sent to"}
        </span>
        <div className={styles.textinput}>
          <label htmlFor="fakurering" />
          <input
            type="email"
            id="fakturering"
            placeholder=" "
            {...register("fakturering", {
              required: {
                value: true,
                message: `${
                  lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                }`,
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: `${lang === "sv" ? "Ogiltig epost" : "Invalid email"}`,
              },
            })}
          />
          <p className={styles.error}>{errors.fakturering?.message}</p>
        </div>
        <h3 style={{ color: "white" }}>
          {lang === "sv"
            ? "Eventuell Firmatecknare"
            : "Eventual Company Signatory"}
        </h3>
        <span>
          {lang === "sv"
            ? "Fyll i nedan namn och position på eventuell firmatecknare eller annan ansvarig som kommer att skriva på kommande avtal."
            : "Enter the name and role of eventual company signatory or another responsible who will sign upcoming contract"}
        </span>
        <div className={styles.textinput}>
          <label htmlFor="firmateknare" />
          <input
            type="text"
            id="firmateknare"
            placeholder=" "
            {...register("firmateknare", {
              required: {
                value: true,
                message: `${
                  lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                }`,
              },
            })}
          />
          <p className={styles.error}>{errors.firmateknare?.message}</p>
        </div>
        <h3 style={{ color: "white" }}>
          {lang === "sv" ? "Organisationsnummer" : "Organization number"}
        </h3>
        <span>
          {lang === "sv"
            ? "Fyll i organisationsnummer."
            : "Enter the organization number."}
        </span>
        <div className={styles.textinput}>
          <label htmlFor="organisationsnummer" />
          <input
            type="text"
            id="organisationsnummer"
            placeholder=" "
            {...register("organisationsnummer", {
              required: {
                value: true,
                message: `${
                  lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                }`,
              },
            })}
          />
          <p className={styles.error}>{errors.organisationsnummer?.message}</p>
        </div>
      </div>
    </div>
  );
}
