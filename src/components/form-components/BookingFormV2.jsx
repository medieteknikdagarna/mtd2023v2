import React, { useState } from "react";
import { SplitScreen } from "@/utilities/SplitScreen";
import FloorMap from "./FloorMap";
import Sponsor from "./Sponsor";
import ContactInfo from "./ContactInfo";
import { useForm } from "react-hook-form";
import MTDSponspaket from "@/public/content/MTDSamarbetspaket.pdf";

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
      <ContactInfo />
    </>
  );
}
