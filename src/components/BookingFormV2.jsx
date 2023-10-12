import React, { useState, useContext, useEffect } from "react";
import { SplitScreen } from "@/utilities/SplitScreen";
import Sponsor from "./form-components/Sponsor";
import ContactInfo from "./form-components/ContactInfo";
import Additions from "./form-components/Additions";
import Bankett from "./form-components/Bankett";
import { useForm, useFieldArray } from "react-hook-form";
import MTDSponspaket from "@/public/content/MTDSamarbetspaket.pdf";
import { languageContext } from "@/pages/_app";
import Other from "./form-components/Other";
import styles from "./form.module.scss";
const formContent = require("@/public/content/form.json");
import Link from "next/link";
import SeatMap from "@/utilities/SeatMap";
import { ref, uploadBytes } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { firebaseApp } from "@/firebase/clientApp";

const floor4_all = require("../../public/content/seat-info/floor4.json");
const floor5_all = require("../../public/content/seat-info/floor5.json");

export const selectedContext = React.createContext();
const storage = getStorage(firebaseApp);

export default function BookingFormV2() {
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
        organisationsnummer: "",
      },
    });
  const { errors } = formState;
  const [lang, setLang] = useContext(languageContext);

  const [type, setType] = useState("Brons");
  const [activeLevel, setLevel] = useState(5);
  const [activeSeats, setActiveSeats] = useState(floor5_all);
  const [floor4_res, setFloor4] = useState([]);
  const [floor5_res, setFloor5] = useState([]);
  const [selectedSeat, setSelected] = useState(floor5_all[0]);

  console.log(selectedSeat);

  const changeFloor = (floor) => {
    setActiveSeats(floor === 5 ? floor5_all : floor4_all);
    setLevel(floor);
  };
  const successMessage = () => {
    alert("Tack för din anmälan!");
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
        organisationsnummer: formValues.organisationsnummer,
        signed: false,
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

  return (
    <div className={styles.container}>
      <SplitScreen>
        <div>
          <h2 style={{ fontSize: "4rem", color: "white" }}>
            {lang === "sv" ? "Plan" : "Floor"} {activeLevel}
          </h2>
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
          </div>
        </div>
        <Sponsor
          currentSponsor={type}
          changeFloor={changeFloor}
          register={register}
          setType={setType}
          watch={watch}
        />
      </SplitScreen>
      <div style={{ display: "flex", marginLeft: "5rem", marginRight: "5rem" }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <ContactInfo register={register} lang={lang} errors={errors} />
          <Additions
            lang={lang}
            register={register}
            changeNumber={changeNumber}
            watch={watch}
            mässField={mässField}
            errors={errors}
          />
          <Bankett
            lang={lang}
            watch={watch}
            register={register}
            changeNumber={changeNumber}
            bankettField={bankettField}
            errors={errors}
          />
          <Other lang={lang} register={register} errors={errors} />
          <div>
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
          <span className={styles.a}>
            {formContent[lang].accept}
            <Link href="/policy" legacyBehavior style={{ color: "#ec6610" }}>
              {formContent[lang].link}
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
