import React from "react";
import styles from "@/components/form-components/contactInput.module.scss";

export default function ContactInput({
  register,
  lang,
  errors,
  type,
  id,
  text,
}) {
  return (
    <div className={styles.contactitem}>
      <input
        type={type}
        id={id}
        placeholder=" "
        {...register(id, {
          required: {
            value: true,
            message: `${lang === "sv" ? " *" : " *"}`,
          },
        })}
      />
      <label htmlFor={id}>
        <div style={{ display: "flex", color: "white" }}>
          {text}
          <p className={styles.error}>{errors && errors.message}</p>
        </div>
      </label>
    </div>
  );
}
