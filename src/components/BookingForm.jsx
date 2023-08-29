import React, { useContext, useRef, useState, useEffect } from "react";
import {
  useForm,
  useController,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { DevTool } from "@hookform/devtools";
import { firebaseApp } from "@/firebase/clientApp";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { getStorage } from "firebase/storage";
import styles from "../styles/BookingForm.module.scss";
import SeatMap from "./utilities/SeatMap";
const formContent = require("../../public/content/form.json");
import { isReserved } from "./utilities/SeatMap";
import WingLeft from "../../public/images/WingLeft.svg";
import { languageContext } from "../pages/_app";
import { Transition } from "react-spring";
import ResponsiveContainer from "./ResponsiveContainer";
import Footer from "@/components/Footer";
//import { Document, Page } from "react-pdf";
import MTDSponspaket from "../../public/content/MTDSamarbetspaket.pdf";
import NumberCounter from "@/components/form-components/NumberCounter";
import FloorMap from "./form-components/FloorMap";

const floor4_all = require("../../public/content/seat-info/floor4.json");
const floor5_all = require("../../public/content/seat-info/floor5.json");

export const selectedContext = React.createContext();

const storage = getStorage(firebaseApp);

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [bookSuccess, setBookSuccess] = useState(false);
  const [bookFailed, setBookFailed] = useState(false);

  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm({
      defaultValues: {
        TV: "",
        antalpåmässa: 0,
        bankettbiljetter: 0,
        bankettkost: [],
        company: "",
        companyadress: "",
        contact: "",
        description: "",
        elenhet: "",
        email: "",
        extrabord: 0,
        extrastol: 0,
        fakturering: "",
        firmateknare: "",
        floor: "5",
        mässkost: [],
        persontransport: "Nej",
        sponsor: "Brons",
        tjänst: "",
        transport: "takeWithUs",
        trådlösaenheter: 0,
      },
    });

  const sponsorWatch = watch("sponsor");

  const { errors } = formState;
  const {
    fields: bankettField,
    append: bankettAppend,
    remove: bankettRemove,
  } = useFieldArray({
    name: "bankettkost",
    control,
  });

  const {
    fields: mässField,
    append: mässAppend,
    remove: mässRemove,
  } = useFieldArray({
    name: "mässkost",
    control,
  });

  /* -- PLANLÖSNING STATES -- */
  const [type, setType] = useState("Brons");
  const [activeLevel, setLevel] = useState(5);
  const [activeSeats, setActiveSeats] = useState(floor5_all);
  const [floor4_res, setFloor4] = useState([]);
  const [floor5_res, setFloor5] = useState([]);
  const [selectedSeat, setSelected] = useState(floor5_all[0]);

  const [lang, setLang] = useContext(languageContext);

  const successMessage = () => {
    setBookSuccess(true);
    setTimeout(() => {
      setBookSuccess(false);
    }, 5000);
  };
  const onSubmit = (formValues) => {
    setLoading(true);

    console.log(formValues);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TV: formValues.TV,
        antalpåmässa: formValues.antalpåmässa,
        bankettbiljetter: formValues.bankettbiljetter,
        bankettkost: formValues.bankettkost,
        company: formValues.company,
        companyadress: formValues.companyadress,
        contact: formValues.contact,
        description: formValues.description,
        elenhet: formValues.elenhet,
        email: formValues.email,
        extrabord: formValues.extrabord,
        extrastol: formValues.extrastol,
        fakturering: formValues.fakturering,
        firmatecknare: formValues.firmateknare,
        floor: formValues.floor,
        seat: selectedSeat.seat,
        mässkost: formValues.mässkost,
        persontransport: formValues.persontransport,
        sponsor: formValues.sponsor,
        tel: formValues.tel,
        tjänst: formValues.tjänst,
        montertransport: formValues.transport,
        trådlösaenheter: formValues.trådlösaenheter,
      }),
    };
    const logoRef = ref(storage, `logotype/${formValues.logotyp[0].name}`);
    uploadBytes(logoRef);
    fetch("/api/book", requestOptions)
      .then((response) => response.json())
      .then((res_data) => {
        if (res_data.success) {
          console.log("sucsess");
          setTimeout(() => {
            setLoading(false);
            successMessage();
          }, 1000);
        } else {
          setBookFailed(true);
          alert("Valda platsen är redan tagen!");
        }
      });
  };
  const fetchData = async () => {
    fetch("/api/book")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFloor4(
          data.filter((seat) => {
            return seat.floor == 4;
          })
        );
        setFloor5(
          data.filter((seat) => {
            return seat.floor == 5;
          })
        );
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const changeFloor = (floor) => {
    setActiveSeats(floor === 5 ? floor5_all : floor4_all);
    setLevel(floor);
  };

  const changeNumber = (value, target) => {
    if (target == "bankett") {
      const newVal = watch("bankettbiljetter") + value;
      if (newVal >= 0) {
        setValue("bankettbiljetter", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
      if (value === 1) {
        bankettAppend({ kost: "" });
      } else if (newVal >= 0) {
        bankettRemove(watch("bankettbiljetter"));
      }
    } else if (target == "fair") {
      const newVal = watch("antalpåmässa") + value;
      if (newVal >= 0) {
        setValue("antalpåmässa", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
      if (value === 1) {
        mässAppend({ kost: "" });
      } else if (newVal >= 0) {
        mässRemove(watch("antalpåmässa"));
      }
    } else if (target == "bord") {
      const newVal = watch("extrabord") + value;
      if (newVal >= 0) {
        setValue("extrabord", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
    } else if (target == "stol") {
      const newVal = watch("extrastol") + value;
      if (newVal >= 0) {
        setValue("extrastol", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
    } else if (target == "enheter") {
      const newVal = watch("trådlösaenheter") + value;
      if (newVal >= 0) {
        setValue("trådlösaenheter", newVal, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
    }
  };

  async function sendMail() {}

  const [colorload, setColorload] = useState(false);
  return (
    <>
      {/*   {watch("sponsor") === "Brons" ? (
        <div
          className={styles.pageGrad}
          style={{
            background:
              "linear-gradient(90deg, rgba(128,74,0,0.5018382352941176) 0%, rgba(128,74,0,0) 10%)",
          }}
        />
      ) : (
        ""
      )}
      {watch("sponsor") === "Silver" ? (
        <div
          className={styles.pageGrad}
          style={{
            background:
              "linear-gradient(90deg, rgba(192,192,192,0.4990371148459384) 0%, rgba(192,192,192,0) 10%)",
          }}
        />
      ) : (
        ""
      )}
      {watch("sponsor") === "Guld" ? (
        <div
          className={styles.pageGrad}
          style={{
            background:
              "linear-gradient(90deg, rgba(179,163,77,0.4990371148459384) 0%, rgba(179,163,77,0) 10%)",
          }}
        />
      ) : (
        ""
      )} */}
      <div className={styles.container}>
        {/* <NumberCounter formValue="antalpåmässa" watch={watch} /> */}

        <div className={styles.topPart}>
          <div className={styles.floorContainer}>
            <selectedContext.Provider value={[selectedSeat, setSelected]}>
              <SeatMap
                type={type}
                key={activeLevel}
                activeFloor={activeLevel}
                seats={activeSeats}
                reservations={activeLevel == 5 ? floor5_res : floor4_res}
                selected={selectedSeat}
              />
            </selectedContext.Provider>
            <div className={styles.floorText}>
              {watch("sponsor") === "Brons" ? (
                <span>
                  Bronssponsorer blir tilldelade en av de blå platserna!
                </span>
              ) : (
                <span>Klicka på en ledig ruta för att välja plats!</span>
              )}
            </div>
          </div>

          <div style={{ width: "32rem" }}>
            <div className={styles.sponsContainer}>
              <h1
                style={{
                  fontSize: "4rem",
                  color:
                    watch("sponsor") === "Brons"
                      ? "#804a00"
                      : watch("sponsor") === "Silver"
                      ? "#c0c0c0"
                      : watch("sponsor") === "Guld"
                      ? "#b3a34d"
                      : "white",
                }}
              >
                {watch("sponsor")}
              </h1>
              <h1 className={styles.paketpris}>
                {watch("sponsor") === "Brons"
                  ? "7 999:-"
                  : watch("sponsor") === "Silver"
                  ? "24 999:-"
                  : watch("sponsor") === "Guld"
                  ? "34 999:-"
                  : ""}
              </h1>
            </div>
            <div className={styles.floorInfo}>
              <div
                className={styles.indicator}
                style={{ backgroundColor: "#89E17B" }}
              ></div>
              <h4>{lang === "sv" ? "Ledig" : "Empty"}</h4>
              <div
                className={styles.indicator}
                style={{ backgroundColor: "#FFF068" }}
              ></div>
              <h4>{lang === "sv" ? "Vald" : "Chosen"}</h4>
              <div
                className={styles.indicator}
                style={{ backgroundColor: "#E07979" }}
              ></div>
              <h4>{lang === "sv" ? "Reserverad" : "Resarverad"}</h4>
              <div
                className={styles.indicator}
                style={{ backgroundColor: "#345f80" }}
              ></div>
              <h4>{lang === "sv" ? "Tilldelad" : "Assigned"}</h4>
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
            <a href="/content/MTDSamarbetspaket.pdf" download>
              {lang === "sv" ? " samarbetspaket" : " partnership package"}
            </a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "7rem",
            justifyContent: "center",
          }}
        >
          <WingLeft
            className={styles.wingLeft}
            width="400"
            height="10"
            preserveascpectratio="null"
          />
          <h1 style={{ color: "white" }}>
            {lang === "sv" ? "Information" : "Information"}
          </h1>
          <WingLeft
            className={styles.wingRight}
            width="400"
            height="10"
            preserveascpectratio="null"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.contact}>
            <div className={styles.contactitem}>
              <input
                type="text"
                id="contact"
                placeholder=" "
                {...register("contact", {
                  required: {
                    value: true,
                    message: `${lang === "sv" ? " *" : " *"}`,
                  },
                })}
              />
              <label htmlFor="contact">
                <div style={{ display: "flex", color: "white" }}>
                  {lang === "sv" ? "Kontaktperson" : "Name"}
                  <p className={styles.error}>{errors.contact?.message}</p>
                </div>
              </label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="text"
                id="company"
                placeholder=" "
                {...register("company", {
                  required: {
                    value: true,
                    message: `${lang === "sv" ? " *" : " *"}`,
                  },
                })}
              />
              <label htmlFor="company">
                <div style={{ display: "flex", color: "white" }}>
                  {lang === "sv" ? "Företag" : "Company name"}
                  <p className={styles.error}>{errors.company?.message}</p>
                </div>
              </label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="text"
                id="companyadress"
                placeholder=" "
                {...register("companyadress", {
                  required: {
                    value: true,
                    message: `${lang === "sv" ? " *" : " *"}`,
                  },
                })}
              />
              <label htmlFor="companyaddress">
                <div style={{ display: "flex", color: "white" }}>
                  {lang === "sv" ? "Företagsadress" : "Company adress"}
                  <p className={styles.error}>
                    {errors.companyadress?.message}
                  </p>
                </div>
              </label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="email"
                id="email"
                placeholder=" "
                {...register("email", {
                  required: {
                    value: true,
                    message: `${lang === "sv" ? " *" : " *"}`,
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: `${
                      lang === "sv" ? "Ogiltig epost" : "Invalid email"
                    }`,
                  },
                })}
              />
              <label htmlFor="email">
                <div style={{ display: "flex", color: "white" }}>
                  Email
                  <p className={styles.error}> {errors.email?.message}</p>
                </div>
              </label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="tel"
                id="tel"
                placeholder=" "
                {...register("tel", {
                  required: {
                    value: true,
                    message: `${lang === "sv" ? " *" : " *"}`,
                  },
                })}
              />
              <label htmlFor="tel">
                <div style={{ display: "flex", color: "white" }}>
                  Tel
                  <p className={styles.error}> {errors.tel?.message}</p>
                </div>
              </label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="text"
                id="description"
                placeholder=" "
                {...register("description", {
                  required: {
                    value: true,
                    message: `${lang === "sv" ? " *" : " *"}`,
                  },
                })}
              />

              <label htmlFor="description">
                <div style={{ display: "flex", color: "white" }}>
                  {lang === "sv"
                    ? "Beskrivning av företag för app och hemsida"
                    : "Description of company for app and websire"}
                  <p className={styles.error}> {errors.description?.message}</p>
                </div>
              </label>
            </div>
          </div>
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

              <div className={styles.counterContainer}>
                <div
                  className={styles.counterDecrement}
                  onClick={() => changeNumber(-1, "fair")}
                >
                  <AiOutlineMinus size={24} style={{ fill: "white" }} />
                </div>
                <div className={styles.counter}>
                  <label htmlFor="antalpåmässa" />
                  <input
                    className={styles.numberInput}
                    type="number"
                    id="antalpåmässa"
                    readOnly
                    {...register("antalpåmässa", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div
                  className={styles.counterIncrement}
                  onClick={() => changeNumber(1, "fair")}
                >
                  <AiOutlinePlus size={24} style={{ fill: "white" }} />
                </div>
              </div>

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
            </div>
            <h3>
              {lang === "sv"
                ? "Montertransport"
                : "Transportation of fair booth"}
            </h3>
            <span>
              {lang === "sv"
                ? "MTD står inte för några fraktkostnader från eller till mässan, adress till godsmottagning: Sandgatan 31, 602 47 Norrköping"
                : "MTD doesn't pay for any shippingcost to or from the fair, adress to tge goods reception: Sandgatan 31, 602 47 Norrköping"}
            </span>
            <div className={styles.option}>
              <input
                type="radio"
                id="T_op1"
                value="sendWithGods"
                {...register("transport")}
              />
              <label htmlFor="T_op1">
                {lang === "sv"
                  ? "Skicka i förväg via godsmottagningen"
                  : "Will be sent in advance through goods reception"}
              </label>
              <input
                type="radio"
                id="T_op2"
                value="takeWithUs"
                {...register("transport")}
              />
              <label htmlFor="T_op2">
                {lang === "sv"
                  ? "Tar med själv till mässdagen"
                  : "Will be brought with us on the day of the fair"}
              </label>
            </div>
            <h3>{lang === "sv" ? "Persontransport" : "Transportation"}</h3>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <span>
                {lang === "sv"
                  ? " Behöver ni transport inom Norrköping t.ex från Resecentrum till Campus på mässdagen?"
                  : "Are you in need of transportation in Norrköping, for example from the central station to campus on the day of the fair?"}
              </span>
              <div className={styles.option}>
                <input
                  type="radio"
                  id="persontransport-ja"
                  value="Ja"
                  {...register("persontransport")}
                />
                <label htmlFor="persontransport-ja">
                  {lang === "sv" ? "Ja" : "Yes"}
                </label>
                <input
                  type="radio"
                  id="persontransport-nej"
                  value="Nej"
                  {...register("persontransport")}
                />
                <label htmlFor="persontransport-nej">
                  {lang === "sv" ? "Nej" : "No"}
                </label>
              </div>
            </div>
            <h3> {lang === "sv" ? "Extra ståbord" : "Extra standing desks"}</h3>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <span>
                {lang === "sv"
                  ? "Alla företag erbjuds ett ståbord. Utöver det kan fler ståbord beställas för 300kr/st. Fyll i antalet bord ni vill ha utöver det som ingår. (Vill ni inte ha något extra fyller ni i 0)"
                  : "All companies are provided with one standing desk. Additional desks can be ordered for 300SEK/each. Enter the number of additional desks wanted. (If no additional desks are wanted, enter 0)"}
              </span>
              <div className={styles.counterContainer}>
                <div
                  className={styles.counterDecrement}
                  onClick={() => changeNumber(-1, "bord")}
                >
                  <AiOutlineMinus size={24} style={{ fill: "white" }} />
                </div>
                <div className={styles.counter}>
                  <label htmlFor="extrabord" />
                  <input
                    className={styles.numberInput}
                    type="number"
                    id="extrabord"
                    readOnly
                    {...register("extrabord", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div
                  className={styles.counterIncrement}
                  onClick={() => changeNumber(1, "bord")}
                >
                  <AiOutlinePlus size={24} style={{ fill: "white" }} />
                </div>
              </div>
            </div>
            <h3> {lang === "sv" ? "Extra barstol" : "Extra barstool"}</h3>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <span>
                {lang === "sv"
                  ? "100kr/st - 2st barstolar ingår för Silver- och Guldsponsor"
                  : "100SEK/each - 2 barstools are included for Silver and Gold sponsors"}
              </span>

              <div className={styles.counterContainer}>
                <div
                  className={styles.counterDecrement}
                  onClick={() => changeNumber(-1, "stol")}
                >
                  <AiOutlineMinus size={24} style={{ fill: "white" }} />
                </div>
                <div className={styles.counter}>
                  <label htmlFor="extrastol" />
                  <input
                    className={styles.numberInput}
                    type="number"
                    id="extrastol"
                    readOnly
                    //value={sponsorWatch === "gold" ? 3 : 0}
                    {...register("extrastol", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div
                  className={styles.counterIncrement}
                  onClick={() => changeNumber(1, "stol")}
                >
                  <AiOutlinePlus size={24} style={{ fill: "white" }} />
                </div>
              </div>
            </div>

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
            <div className={styles.counterContainer}>
              <div
                className={styles.counterDecrement}
                onClick={() => changeNumber(-1, "enheter")}
              >
                <AiOutlineMinus size={24} style={{ fill: "white" }} />
              </div>
              <div className={styles.counter}>
                <label htmlFor="trådlösaenheter" />
                <input
                  className={styles.numberInput}
                  type="number"
                  id="trådlösaenheter"
                  readOnly
                  {...register("trådlösaenheter", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div
                className={styles.counterIncrement}
                onClick={() => changeNumber(1, "enheter")}
              >
                <AiOutlinePlus size={24} style={{ fill: "white" }} />
              </div>
            </div>

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
              <label htmlFor="exjobb">
                {lang === "sv" ? "Exjobb" : "Exjob"}
              </label>
              <input
                type="checkbox"
                id="praktik"
                value="praktik"
                {...register("tjänst")}
              />
              <label htmlFor="praktik">
                {" "}
                {lang === "sv" ? "Praktik" : "Internship"}
              </label>
              <input
                type="checkbox"
                id="trainee"
                value="trainee"
                {...register("tjänst")}
              />
              <label htmlFor="trainee">
                {" "}
                {lang === "sv" ? "Trainee" : "Trainee"}
              </label>
              <input
                type="checkbox"
                id="sommarjobb"
                value="sommarjobb"
                {...register("tjänst")}
              />
              <label htmlFor="sommarjobb">
                {" "}
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
          <h2 id={styles.underLine}>
            {" "}
            {lang === "sv" ? "Bankett" : "Banquet"}
          </h2>
          <div>
            <div
              style={{ display: "flex", flexFlow: "column" }}
              className={styles.numberattend}
            >
              <h3>{lang === "sv" ? "Bankettbiljetter" : "Banquest Tickets"}</h3>
              <span>
                {lang === "sv"
                  ? "Hur många bankettbiljetter vill ni ha inför banketten som hålls efter MTD (ca 600kr/st). Guld sponsorer får 3st biljetter"
                  : "How many banquet tickets would you like for the banquet which will be held after MTD (ca 600SEK/each)"}
              </span>
              <div className={styles.counterContainer}>
                <div
                  className={styles.counterDecrement}
                  onClick={() => changeNumber(-1, "bankett")}
                >
                  <AiOutlineMinus size={24} style={{ fill: "white" }} />
                </div>
                <div className={styles.counter}>
                  <label htmlFor="Bankettbiljetter" />
                  <input
                    className={styles.numberInput}
                    type="number"
                    id="Bankettbiljetter"
                    readOnly
                    {...register("bankettbiljetter", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div
                  className={styles.counterIncrement}
                  onClick={() => changeNumber(1, "bankett")}
                >
                  <AiOutlinePlus size={24} style={{ fill: "white" }} />
                </div>
              </div>
              {watch("bankettbiljetter") > 0 && (
                <div>
                  <h3>Specialkost</h3>
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
          <div>
            <h2 id={styles.underLine}>{lang === "sv" ? "Övrigt" : "Other"}</h2>
          </div>
          <div>
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
              <h3>
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
                      message: `${
                        lang === "sv" ? "Ogiltig epost" : "Invalid email"
                      }`,
                    },
                  })}
                />
                <p className={styles.error}>{errors.fakturering?.message}</p>
              </div>
              <h3>
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
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className={styles.submitButton}>
              {loading && <p>{lang === "sv" ? "Laddar" : "Loading"}</p>}
              {!loading && <p>{lang === "sv" ? "Boka" : "Book"}</p>}
            </button>
          </div>
          {bookSuccess && (
            <p style={{ marginTop: "2rem" }}>
              {lang === "sv" ? "Bookning skickad!" : "Registration sent!"}
            </p>
          )}
          {bookFailed && (
            <p style={{ marginTop: "2rem" }}>
              {lang === "sv" ? "Bookning misslyckad!" : "Registration failed!"}
            </p>
          )}
          <span>
            {formContent[lang].accept}
            <Link href="/policy" legacyBehavior>
              {formContent[lang].link}
            </Link>
          </span>
        </form>
      </div>
      <Footer />
    </>
  );
}
