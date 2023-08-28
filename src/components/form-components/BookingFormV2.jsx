import React, { useState, useContext } from "react";
import { SplitScreen } from "@/utilities/SplitScreen";
import FloorMap from "./FloorMap";
import Sponsor from "./Sponsor";
import ContactInfo from "./ContactInfo";
import { useForm } from "react-hook-form";
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
      </form>
    </>
  );
}
