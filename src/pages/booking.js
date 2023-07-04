import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
import BookingForm from "@/components/BookingForm";
import SeatBooker from "@/components/SeatBooker";

export default function BookingPage() {
  const [type, setType] = useState("Mässplats");
  return (
    <>
      <NextSeo noindex={true} />
      <div style={{ width: "100vw" }}>
        <Header changeOnScroll />
        <BookingForm />
      </div>
    </>
  );
}
