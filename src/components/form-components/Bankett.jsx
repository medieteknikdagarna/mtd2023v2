import React from "react";
import styles from "@/components/form-components/bankett.module.scss";
import NumberCounter from "./NumberCounter";

export default function Bankett({
  lang,
  watch,
  register,
  changeNumber,
  bankettField,
  errors,
}) {
  return (
    <div style={{ color: "white" }}>
      <h2 id={styles.underLine}>{lang === "sv" ? "Bankett" : "Banquet"}</h2>
      <div>
        <div>
          <h3 style={{ color: "white" }}>
            {lang === "sv" ? "Bankettbiljetter" : "Banquest Tickets"}
          </h3>
          <span>
            {lang === "sv"
              ? "Hur många bankettbiljetter vill ni ha inför banketten som hålls efter MTD (ca 600kr/st). Guld sponsorer får 3st biljetter"
              : "How many banquet tickets would you like for the banquet which will be held after MTD (ca 600SEK/each)"}
          </span>
          <NumberCounter
            register={register}
            changeNumber={changeNumber}
            id="bankettbiljetter"
            target="bankett"
          />
          {watch("bankettbiljetter") > 0 && (
            <div>
              <h3 style={{ color: "white" }}>Specialkost</h3>
              <div>
                {bankettField.map((kost, index) => {
                  return (
                    <div className={styles.fairfood} key={kost.id}>
                      <input
                        type="text"
                        placeholder=" "
                        {...register(`bankettkost.${index}.kost`, {
                          required: {
                            value: true,
                            message: `${
                              lang === "sv"
                                ? "Obligatoriskt"
                                : "Must be filled in"
                            }`,
                          },
                        })}
                      />
                      <p className={styles.error}>
                        {errors.bankettkost?.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
