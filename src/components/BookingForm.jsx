import { useState, useEffect } from "react";
import {
  useForm,
  useController,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { firebaseApp } from "@/firebase/clientApp";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase/storage";
import styles from "../styles/BookingForm.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function BookingForm() {
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm({
      defaultValues: {
        sponsor: "",
        transport: "",
        bankettbiljetter: 0,
        bankettkost: [],
        antalpåmässa: 0,
        mässkost: [],
        extrabord: 0,
        extrastol: 0,
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

  const addBankettKost = () => {
    bankettAppend({ kost: "" });
    console.log("hej");
  };
  const addMässKost = () => {
    const currentMässCount = mässField.length;
    const newMässCount = watch("antalpåmässa");
    const diff = Math.abs(currentMässCount - newMässCount);
    if (newMässCount > currentMässCount) {
      for (let i = 0; i < diff; i++) {
        mässAppend({ kost: "" });
      }
    } else {
      for (let i = 0; i < diff; i++) {
        mässRemove(newMässCount);
      }
    }
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    console.log(formValues);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    /* const logoRef = ref(storage, `logotype/${formValues.logotyp[0].name}`);
    try {
      const docRef = addDoc(collection(db, "companies"), {
        TV: formValues.TV,
      });
      uploadBytes(logoRef, formValues.logotyp[0]);
    } catch (e) {
      console.log(e);
    } */
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

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.paket}>
            <h1>Välj Sponsorpaket</h1>
          </div>
          <div className={styles.sponsor}>
            <div className={styles.bronze}>
              <input
                type="radio"
                id="sponsor-op1"
                value="bronze"
                {...register("sponsor")}
              />
              <label htmlFor="sponsor-op1">Brons</label>
            </div>

            <div className={styles.silver}>
              <input
                type="radio"
                id="sponsor-op2"
                value="silver"
                {...register("sponsor")}
              />
              <label htmlFor="sponsor-op2">Silver</label>
            </div>
            <div className={styles.gold}>
              <input
                type="radio"
                id="sponsor-op3"
                value="gold"
                {...register("sponsor")}
              />
              <label htmlFor="sponsor-op3">Guld</label>
            </div>
          </div>
          <div className={styles.contact}>
            <div className={styles.contactitem}>
              <input
                type="text"
                id="contact"
                placeholder=" "
                {...register("contact")}
              />
              <label htmlFor="contact">Kontaktperson</label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="text"
                id="company"
                placeholder=" "
                {...register("company")}
              />
              <label htmlFor="company">Företag</label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="text"
                id="companyadress"
                placeholder=" "
                {...register("companyadress")}
              />
              <label htmlFor="companyaddress">Företagsadress</label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="email"
                id="email"
                placeholder=" "
                {...register("email")}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={styles.contactitem}>
              <input type="tel" id="tel" placeholder=" " {...register("tel")} />
              <label htmlFor="tel">Tel</label>
            </div>
            <div className={styles.contactitem}>
              <input
                type="text"
                id="description"
                placeholder=" "
                {...register("description")}
              />
              <label htmlFor="description">Beskrivning</label>
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <h2 style={{ color: "#ec6610" }}>Tillägg</h2>
          </div>
          <div className={styles.fairday}>
            <h2>Mässdag</h2>
            <div className={styles.numberattend}>
              <span>Hur många kommer på mässdagen?</span>

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
                  <h3>Kost</h3>
                  <div>
                    {mässField.map((kost, index) => {
                      return (
                        <div className={styles.fairfood} key={kost.id}>
                          <input
                            type="text"
                            {...register(`mässkost.${index}.kost`)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <h3>Montertransport</h3>
            <div className={styles.option}>
              <input
                type="radio"
                id="T_op1"
                value="sendWithGods"
                {...register("transport")}
              />
              <label htmlFor="T_op1">
                Skicka i förväg via godsmottagningen
              </label>
              <input
                type="radio"
                id="T_op2"
                value="takeWithUs"
                {...register("transport")}
              />
              <label htmlFor="T_op2">
                Tar med själv till mässan på mässdagen
              </label>
            </div>
            <h3>Persontransport</h3>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <span>
                Behöver ni trasport inom Norköping t.ex från Resecentrum till
                Campus på mässdagen
              </span>
              <div className={styles.option}>
                <input
                  type="radio"
                  id="persontransport-ja"
                  value="Ja"
                  {...register("persontransport")}
                />
                <label htmlFor="persontransport-ja">Ja</label>
                <input
                  type="radio"
                  id="persontransport-nej"
                  value="Nej"
                  {...register("persontransport")}
                />
                <label htmlFor="persontransport-nej">Nej</label>
              </div>
            </div>
            <h3>Extrabord</h3>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <span>Hur många extra bord</span>
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
            <h3>Extrastol</h3>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <span>Hur många extra stolar</span>

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
                      onChange: addBankettKost,
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
            <h3>Extra TV-skärm</h3>
            <div className={styles.option}>
              <input type="radio" id="TV-op1" value="32" {...register("TV")} />
              <label htmlFor="TV-op1">32TV-skärm kost</label>
              <input type="radio" id="TV-op2" value="40" {...register("TV")} />
              <label htmlFor="TV-op2">40TV-skärm</label>
              <input type="radio" id="TV-op3" value="47" {...register("TV")} />
              <label htmlFor="TV-op3">47TV-skärm</label>
              <input type="radio" id="TV-op4" value="55" {...register("TV")} />
              <label htmlFor="TV-op4">55TV-skärm</label>
            </div>
            <h3>Uppskattat antel enheter som behöver trådlöst nätverk?</h3>
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
              Har ni någon elutrustning som drar säskilt mycket ström, i så fall
              vad?
            </h3>
            <div className={styles.textinput}>
              <input
                type="text"
                id="elenhet"
                placeholder=" "
                {...register("elenhet")}
              />
              <label htmlFor="elenhet" />
            </div>
            <h3>Tjänster för besökare</h3>
            <div
              className={styles.option}
              style={{ paddingTop: "1rem", paddingBottom: ".5rem" }}
            >
              <input
                type="radio"
                id="exjobb"
                value="exjobb"
                {...register("tjänst")}
              />
              <label htmlFor="exjobb">Exjobb</label>
              <input
                type="radio"
                id="praktik"
                value="praktik"
                {...register("tjänst")}
              />
              <label htmlFor="praktik">Praktik</label>
              <input
                type="radio"
                id="trainee"
                value="trainee"
                {...register("tjänst")}
              />
              <label htmlFor="trainee">Trainee</label>
              <input
                type="radio"
                id="sommarjobb"
                value="sommarjobb"
                {...register("tjänst")}
              />
              <label htmlFor="sommarjobb">Sommarjobb</label>
              <input
                type="radio"
                id="anställning"
                value="anställning"
                {...register("tjänst")}
              />
              <label htmlFor="anställning">Anställning</label>
            </div>
          </div>
          <h2>Bankett</h2>
          <div>
            <div
              style={{ display: "flex", flexFlow: "column" }}
              className={styles.numberattend}
            >
              <span>Hur många kommer på banketten?</span>
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
                    //value={sponsorWatch === "gold" ? 3 : 0}
                    {...register("bankettbiljetter", {
                      valueAsNumber: true,
                      onChange: addBankettKost,
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
                  <h3>Kost</h3>
                  <div>
                    {bankettField.map((kost, index) => {
                      return (
                        <div className="form-control" key={kost.id}>
                          <input
                            type="text"
                            {...register(`bankettkost.${index}.kost`)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2>Övrigt</h2>
          </div>
          <div>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <span>
                Infoga eran logotyp så den kan användas i app och webb
              </span>
              <label htmlFor="logotyp" />
              <input
                style={{ color: "#fff" }}
                type="file"
                id="logotyp"
                {...register("logotyp", {})}
              />
              <p>{errors.logotyp?.message}</p>
            </div>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <h3>Faktureringsuppgifter</h3>
              <span>Vilken e-postadress ska fakturan skickas till?</span>
              <div className={styles.textinput}>
                <label htmlFor="fakurering" />
                <input
                  type="email"
                  id="fakturering"
                  placeholder=" "
                  {...register("fakturering", {
                    required: "hej",
                  })}
                />
              </div>
              <h3>Eventuell Firmateknare</h3>
              <span>Fyll i nedan namn på firmatecknare</span>
              <div className={styles.textinput}>
                <label htmlFor="firmateknare" />
                <input
                  type="text"
                  id="firmateknare"
                  placeholder=" "
                  {...register("firmateknare", {
                    required: "hej",
                  })}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className={styles.submitButton}>
              {loading && <p>Laddar</p>}
              {!loading && <p>Boka</p>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
