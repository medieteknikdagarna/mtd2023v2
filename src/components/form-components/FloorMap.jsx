import React, { useState, useContext } from "react";
import SeatMap from "@/utilities/SeatMap";
const floor4_all = require("../../../public/content/seat-info/floor4.json");
const floor5_all = require("../../../public/content/seat-info/floor5.json");

export const selectedContext = React.createContext();

export default function FloorMap() {
  console.log(floor5_all);
  const [type, setType] = useState("Brons");
  const [activeLevel, setLevel] = useState(5);
  const [activeSeats, setActiveSeats] = useState(floor5_all);
  const [floor4_res, setFloor4] = useState([]);
  const [floor5_res, setFloor5] = useState([]);
  const [selectedSeat, setSelected] = useState(floor5_all[0]);

  return (
    <>
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
    </>
  );
}
