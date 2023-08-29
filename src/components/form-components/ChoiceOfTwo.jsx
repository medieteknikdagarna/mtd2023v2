import React from "react";
import styles from "@/components/form-components/choiceOfTwo.module.scss";

export default function ChoiceOfTwo({ register, regValue, text }) {
  return (
    <div className={styles.option}>
      <input
        type="radio"
        id={text.op1.id}
        value={text.op1.value}
        {...register(regValue)}
      />
      <label htmlFor={text.op1.id}>{text.op1.text}</label>
      <input
        type="radio"
        id={text.op2.id}
        value={text.op2.value}
        {...register(regValue)}
      />
      <label htmlFor={text.op2.id}>{text.op2.text}</label>
    </div>
  );
}
