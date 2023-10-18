import React, { useContext } from "react";
import { languageContext } from "@/pages/_app";
import styles from "@/components/form-components/sponsor.module.scss";

import Indicator from "./Indicator";

export default function Sponsor({
  currentSponsor,
  changeFloor,
  register,
  setType,
  watch,
}) {
  const [lang, setLang] = useContext(languageContext);
  return (
    <>
      <div>
        <div className={styles.sponsContainer}>
          <h1
            style={{
              fontSize: "4rem",
              color:
                currentSponsor === "Brons"
                  ? "#804a00"
                  : currentSponsor === "Silver"
                  ? "#c0c0c0"
                  : currentSponsor === "Guld"
                  ? "#b3a34d"
                  : "white",
            }}
          >
            {currentSponsor}
          </h1>
          <h1 className={styles.paketpris}>
            {currentSponsor === "Brons"
              ? "7 999:-"
              : currentSponsor === "Silver"
              ? "24 999:-"
              : currentSponsor === "Guld"
              ? "34 999:-"
              : ""}
          </h1>
        </div>

        <div className={styles.floorInfo}>
          <Indicator
            color={"#89E17B"}
            text={lang === "sv" ? "Ledig" : "Empty"}
          />
          <Indicator
            color={"#FFF068"}
            text={lang === "sv" ? "Vald" : "Chosen"}
          />
          <Indicator
            color={"#E07979"}
            text={lang === "sv" ? "Reserverad" : "Resarverad"}
          />
          <Indicator
            color={"#345f80"}
            text={lang === "sv" ? "Tilldelas" : "Assigns"}
          />
        </div>
        <div className={styles.floorText} style={{ marginTop: "1rem" }}>
          {watch("sponsor") === "Brons" ? (
            <>
              <span style={{ color: "white" }}> Bronssponsorer får </span>
              <span style={{ color: "red" }}>inte välja en plats </span>
              <span style={{ color: "white" }}>
                utan blir tilldelad en av de blå platserna. Det finns få
                bronsplatser kvar!
              </span>
            </>
          ) : (
            <span style={{ color: "white" }}>
              Klicka på en ledig ruta för att välja plats.
            </span>
          )}
        </div>
        <p className="seat-information-p">
          {lang === "sv"
            ? "Mässan tar plats på våning 4 samt 5 i Täppan, Campus Norrköping. Ni bokar genom att välja en plats och våning i vår platskarta."
            : "The fair will take place on floor 4 and 5 in Täppan at Campus Norrköping. Book your spot by choosing floor and seat in the figure."}
        </p>
        <div className={styles.floorSelect}>
          <input
            type="radio"
            id="floor-op1"
            value="4"
            onClick={() => changeFloor(4)}
            {...register("floor", {})}
          />
          <label htmlFor="floor-op1">Plan 4</label>
          <input
            type="radio"
            id="floor-op2"
            value="5"
            onClick={() => changeFloor(5)}
            {...register("floor", {})}
          />
          <label htmlFor="floor-op2">Plan 5</label>
        </div>
        <div className={styles.paket}>
          <h2>
            {lang === "sv" ? "Välj Sponsorpaket" : "Chose Sponsor Package"}
          </h2>
        </div>
        <div className={styles.sponsor}>
          <div className={styles.bronze}>
            <input
              type="radio"
              id="sponsor-op1"
              value="Brons"
              onClick={() => setType("Brons")}
              {...register("sponsor")}
            />
            <label htmlFor="sponsor-op1">
              {lang === "sv" ? "Brons" : "Bronze"}
            </label>
          </div>

          <div className={styles.silver}>
            <input
              type="radio"
              id="sponsor-op2"
              value="Silver"
              onClick={() => setType("Silver")}
              {...register("sponsor")}
            />
            <label htmlFor="sponsor-op2">
              {lang === "sv" ? "Silver" : "Silver"}
            </label>
          </div>
          <div className={styles.gold}>
            <input
              type="radio"
              id="sponsor-op3"
              value="Guld"
              onClick={() => setType("Guld")}
              {...register("sponsor")}
            />
            <label htmlFor="sponsor-op3">
              {lang === "sv" ? "Guld" : "Gold"}
            </label>
          </div>
        </div>
        <span>
          För mer information om vad som ingår i paketen ladda ner vårt
        </span>
        <a
          href="/content/MTDSamarbetspaket.pdf"
          download
          style={{ color: "#ec6610" }}
        >
          {lang === "sv" ? " samarbetspaket" : " partnership package"}
        </a>
      </div>
    </>
  );
}
