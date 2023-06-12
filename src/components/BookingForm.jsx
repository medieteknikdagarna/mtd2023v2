import { useState, useEffect } from "react";
import { useForm, useController, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { firebaseApp } from "@/firebase/clientApp";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase/storage";
import styles from "../styles/BookingForm.module.scss";

export default function BookingForm() {
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const [info, setInfo] = useState();
  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm({
      defaultValues: {
        sponsor: "",
        transport: "",
        bankettbiljetter: 0,
        bankettkost: [],
        antalpåmässdag: 0,
        mässkost: [],
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
    console.log(formValues);
    const logoRef = ref(storage, `logotype/${formValues.logotyp[0].name}`);
    try {
      const docRef = addDoc(collection(db, "companies"), {
        TV: formValues.TV,
      });
      uploadBytes(logoRef, formValues.logotyp[0]);
    } catch (e) {
      console.log(e);
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
            <input
              type="radio"
              id="sponsor-op1"
              value="bronze"
              {...register("sponsor")}
            />
            <label htmlFor="sponsor-op1">Bronze</label>
            <input
              type="radio"
              id="sponsor-op3"
              value="gold"
              {...register("sponsor")}
            />
            <label htmlFor="sponsor-op3">Guld</label>
            <input
              type="radio"
              id="sponsor-op2"
              value="silver"
              {...register("sponsor")}
            />
            <label htmlFor="sponsor-op2">Silver</label>
          </div>
          <div className={styles.contact}>
            <div className={styles.contactitem}>
              <label htmlFor="contact">Kontaktperson</label>
              <input
                type="text"
                id="contact"
                placeholder=" "
                {...register("contact")}
              />
            </div>
            <div className={styles.contactitem}>
              <label htmlFor="company">Företag</label>
              <input type="text" id="company" {...register("company")} />
            </div>
            <div className={styles.contactitem}>
              <label htmlFor="companyaddress">Företags adress</label>
              <input
                type="text"
                id="companyadress"
                {...register("companyadress")}
              />
            </div>
            <div className={styles.contactitem}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" {...register("email")} />
            </div>
            <div className={styles.contactitem}>
              <label htmlFor="tel">Tel</label>
              <input type="tel" id="tel" {...register("tel")} />
            </div>
            <div className={styles.contactitem}>
              <label htmlFor="description">Beskrivning</label>
              <input
                type="text"
                id="description"
                {...register("description")}
              />
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
              <label htmlFor="antalpåmässa" />
              <input
                type="number"
                id="antalpåmässa"
                placeholder="0"
                min={0}
                {...register("antalpåmässa", {
                  valueAsNumber: true,
                  onChange: addMässKost,
                })}
              />
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
            <div
              className={styles.sponsor}
              style={{ paddingTop: "1rem", paddingBottom: ".5rem" }}
            >
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
            <span>
              Behöver ni trasport inom Norköping t.ex från Resecentrum till
              Campus på mässdagen
            </span>
            <div
              className={styles.sponsor}
              style={{ paddingTop: "1rem", paddingBottom: ".5rem" }}
            >
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
            <h3>Extrabord</h3>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <span>Hur många extra bord</span>
              <label htmlFor="extrabord" />
              <input
                type="number"
                id="extrabord"
                {...register("extrabord", { valueAsNumber: true })}
              />
            </div>
            <h3>Extrastol</h3>
            <span>Hur många extra stolar</span>
            <div style={{ display: "flex", flexFlow: "column" }}>
              <label htmlFor="extrastol" />
              <input
                type="number"
                id="extrastol"
                {...register("extrastol", { valueAsNumber: true })}
              />
            </div>
            <h3>Extra TV-skärm</h3>
            <div
              className={styles.sponsor}
              style={{ paddingTop: "1rem", paddingBottom: ".5rem" }}
            >
              <input type="radio" id="TV-op1" value="32" {...register("TV")} />
              <label htmlFor="TV-op1">32"TV-skärm</label>
              <input type="radio" id="TV-op2" value="40" {...register("TV")} />
              <label htmlFor="TV-op2">40"TV-skärm</label>
              <input type="radio" id="TV-op3" value="47" {...register("TV")} />
              <label htmlFor="TV-op3">47"TV-skärm</label>
              <input type="radio" id="TV-op4" value="55" {...register("TV")} />
              <label htmlFor="TV-op4">55"TV-skärm</label>
            </div>
            <h3>Uppskattat antel enheter som behöver trådlöst nätverk?</h3>
            <input
              type="number"
              id="trådlösaenheter"
              {...register("trådlösaenheter", { valueAsNumber: true })}
            />
            <h3>
              Har ni någon elutrustning som drar säskilt mycket ström, i så fall
              vad?
            </h3>
            <input
              type="text"
              id="elenhet"
              {...register("elenhet", {
                required: "hej",
              })}
            />
            <h3>Tjänster för besökare</h3>
            <div
              className={styles.sponsor}
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
              <label htmlFor="anställning">anställning</label>
            </div>
          </div>
          <div>
            <h2>Bankett</h2>
            <div
              style={{ display: "flex", flexFlow: "column" }}
              className={styles.numberattend}
            >
              <span>Hur många kommer på banketten?</span>
              <label htmlFor="Bankettbiljetter" />
              <input
                type="number"
                id="Bankettbiljetter"
                value={sponsorWatch === "gold" ? 3 : 0}
                {...register("bankettbiljetter", {
                  valueAsNumber: true,
                  onChange: addBankettKost,
                })}
              />
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
              <label htmlFor="fakurering" />
              <input
                type="email"
                id="fakturering"
                {...register("fakturering", {
                  required: "hej",
                })}
              />
              <h3>Eventuell Firmateknare</h3>
              <span>Fyll i nedan namn på firmatecknare</span>
              <label htmlFor="firmateknare" />
              <input
                type="text"
                id="firmateknare"
                {...register("firmateknare", {
                  required: "hej",
                })}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Boka
          </button>
        </form>
      </div>
    </>
  );
}
