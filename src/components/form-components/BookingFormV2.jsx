import React, { useState, useContext } from "react";
import { SplitScreen } from "@/utilities/SplitScreen";
import FloorMap from "./FloorMap";
import Sponsor from "./Sponsor";
import ContactInfo from "./ContactInfo";
import Additions from "./Additions";
import { useForm, useFieldArray } from "react-hook-form";
import MTDSponspaket from "@/public/content/MTDSamarbetspaket.pdf";
import { languageContext } from "@/pages/_app";

const floor4_all = require("@/public/content/seat-info/floor4.json");
const floor5_all = require("@/public/content/seat-info/floor5.json");

const LeftHandComp = () => {
  return <h1>Left</h1>;
};
const RightHandComp = () => {
  return <h1>Right</h1>;
};

export default function BookingFormV2() {
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
  const { errors } = formState;
  const [lang, setLang] = useContext(languageContext);

  const [type, setType] = useState("Brons");
  const [activeLevel, setLevel] = useState(5);
  const [activeSeats, setActiveSeats] = useState(floor5_all);
  const [floor4_res, setFloor4] = useState([]);
  const [floor5_res, setFloor5] = useState([]);
  const [selectedSeat, setSelected] = useState(floor5_all[0]);

  const changeFloor = (floor) => {
    setActiveSeats(floor === 5 ? floor5_all : floor4_all);
    setLevel(floor);
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

  return (
    <>
      <SplitScreen>
        <LeftHandComp />
        <Sponsor
          currentSponsor={type}
          changeFloor={changeFloor}
          register={register}
          setType={setType}
        />
      </SplitScreen>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ContactInfo register={register} lang={lang} errors={errors} />
        <Additions
          lang={lang}
          register={register}
          changeNumber={changeNumber}
          watch={watch}
          mässField={mässField}
        />
      </form>
    </>
  );
}
