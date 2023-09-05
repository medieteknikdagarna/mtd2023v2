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
  errors,
}) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
          <h3>{lang === "sv" ? "Lägg till TV-skärm" : "Order TV-screens"}</h3>
          <span>
            {lang === "sv"
              ? "Det ingår inte en TV-skärm i något av paketen"
              : "No TV-screens are included in any of the sponsor packages"}
          </span>
          <div className={styles.option} id={styles.TV}>
            <input type="radio" id="TV-op1" value="32" {...register("TV")} />
            <label htmlFor="TV-op1">
              {lang === "sv"
                ? '32" TV-skärm med stativ 2500kr/st'
                : '32" TV-screen with stand 2500SEK/each'}
            </label>
            <input type="radio" id="TV-op2" value="40" {...register("TV")} />
            <label htmlFor="TV-op2">
              {lang === "sv"
                ? '40" TV-skärm med stativ 3200kr/st'
                : '40" TV-screen with stand 3200SEK/each'}
            </label>
            <input type="radio" id="TV-op3" value="47" {...register("TV")} />
            <label htmlFor="TV-op3">
              {lang === "sv"
                ? '47" TV-skärm med stativ 3900kr/st'
                : '47" TV-screen with stand 3900SEK/each'}
            </label>
            <input type="radio" id="TV-op4" value="55" {...register("TV")} />
            <label htmlFor="TV-op4">
              {lang === "sv"
                ? '55" TV-skärm med stativ 4300kr/st'
                : '55" TV-screen with stand 4300SEK/each'}
            </label>
          </div>
          <h3>
            {lang === "sv"
              ? "Uppskattat antal enheter som behöver trådlöst nätverk?"
              : "Estimated number of devices in need of wireless network"}
          </h3>
          <NumberCounter
            register={register}
            changeNumber={changeNumber}
            id={"trådlösaenheter"}
            target={"enheter"}
          />
          <h3>
            {lang === "sv"
              ? "Har ni någon elutrustning som drar särskilt mycket ström, i så fall vad?"
              : "Do you have any electrical equipment with high electrical consumption?"}
          </h3>
          <div className={styles.textinput}>
            <input
              type="text"
              id="elenhet"
              placeholder=" "
              {...register("elenhet", {
                required: {
                  value: true,
                  message: `${
                    lang === "sv" ? "Obligatoriskt" : "Must be filled in"
                  }`,
                },
              })}
            />
            <p className={styles.error}>{errors.elenhet?.message}</p>
            <label htmlFor="elenhet" />
          </div>
          <h3>
            {lang === "sv"
              ? "Erbjuder ni tjänster för besökarna?"
              : "Are you offerring any services for visitors?"}
          </h3>
          <div
            className={styles.option}
            style={{ paddingTop: "1rem", paddingBottom: ".5rem" }}
          >
            <input
              type="checkbox"
              id="exjobb"
              value="exjobb"
              {...register("tjänst")}
            />
            <label htmlFor="exjobb">{lang === "sv" ? "Exjobb" : "Exjob"}</label>
            <input
              type="checkbox"
              id="praktik"
              value="praktik"
              {...register("tjänst")}
            />
            <label htmlFor="praktik">
              {lang === "sv" ? "Praktik" : "Internship"}
            </label>
            <input
              type="checkbox"
              id="trainee"
              value="trainee"
              {...register("tjänst")}
            />
            <label htmlFor="trainee">
              {lang === "sv" ? "Trainee" : "Trainee"}
            </label>
            <input
              type="checkbox"
              id="sommarjobb"
              value="sommarjobb"
              {...register("tjänst")}
            />
            <label htmlFor="sommarjobb">
              {lang === "sv" ? "Sommarjobb" : "Summerjob"}
            </label>
            <input
              type="checkbox"
              id="anställning"
              value="anställning"
              {...register("tjänst")}
            />
            <label htmlFor="anställning">
              {lang === "sv" ? "Anställning" : "Employment"}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
