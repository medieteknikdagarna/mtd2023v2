import React from "react";
import styles from "@/components/form-components/additions.module.scss";
import NumberCounter from "./NumberCounter";
import ChoiceOfTwo from "./ChoiceOfTwo";
import choiceText from "@/public/content/choiceText.json";

export default function Additions({
  lang,
  register,
  changeNumber,
  watch,
  mässField,
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2 style={{ color: "#ec6610" }}>
          {lang === "sv" ? "Tillägg" : "Additions"}
        </h2>
      </div>
      <div className={styles.fairday}>
        <h2 id={styles.underLine}>Mässdag</h2>
        <div className={styles.numberattend}>
          <h3>
            {lang === "sv"
              ? "Hur många från ert företag kommer på mässdagen?"
              : "How many from the company are coming to the fair?"}
          </h3>
          <NumberCounter
            register={register}
            changeNumber={changeNumber}
            id="antalpåmässa"
            target="fair"
          />
          {watch("antalpåmässa") > 0 && (
            <div>
              <h3>Specialkost</h3>
              <div>
                {mässField.map((kost, index) => {
                  return (
                    <div className={styles.fairfood} key={kost.id}>
                      <input
                        type="text"
                        placeholder=" "
                        {...register(`mässkost.${index}.kost`, {
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
                      <p className={styles.error}></p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <h3>
            {lang === "sv" ? "Montertransport" : "Transportation of fair booth"}
          </h3>
          <span>
            {lang === "sv"
              ? "MTD står inte för några fraktkostnader från eller till mässan, adress till godsmottagning: Sandgatan 31, 602 47 Norrköping"
              : "MTD doesn't pay for any shippingcost to or from the fair, adress to tge goods reception: Sandgatan 31, 602 47 Norrköping"}
          </span>
          <ChoiceOfTwo
            register={register}
            regValue="transport"
            text={
              lang === "sv"
                ? choiceText.sv.montertransport
                : choiceText.en.montertransport
            }
          />
          <h3>{lang === "sv" ? "Persontransport" : "Transportation"}</h3>
          <span>
            {lang === "sv"
              ? " Behöver ni transport inom Norrköping t.ex från Resecentrum till Campus på mässdagen?"
              : "Are you in need of transportation in Norrköping, for example from the central station to campus on the day of the fair?"}
          </span>
          <ChoiceOfTwo
            register={register}
            regValue={"persontransport"}
            text={
              lang === "sv"
                ? choiceText.sv.persontransport
                : choiceText.en.persontransport
            }
          />
          <h3> {lang === "sv" ? "Extra ståbord" : "Extra standing desks"}</h3>
          <span>
            {lang === "sv"
              ? "Alla företag erbjuds ett ståbord. Utöver det kan fler ståbord beställas för 300kr/st. Fyll i antalet bord ni vill ha utöver det som ingår. (Vill ni inte ha något extra fyller ni i 0)"
              : "All companies are provided with one standing desk. Additional desks can be ordered for 300SEK/each. Enter the number of additional desks wanted. (If no additional desks are wanted, enter 0)"}
          </span>
          <NumberCounter
            register={register}
            changeNumber={changeNumber}
            id="extrabord"
            target="bord"
          />
          <h3> {lang === "sv" ? "Extra barstol" : "Extra barstool"}</h3>
          <span>
            {lang === "sv"
              ? "100kr/st - 2st barstolar ingår för Silver- och Guldsponsor"
              : "100SEK/each - 2 barstools are included for Silver and Gold sponsors"}
          </span>
          <NumberCounter
            register={register}
            changeNumber={changeNumber}
            target="stol"
            id="extrastol"
          />
        </div>
      </div>
    </>
  );
}
