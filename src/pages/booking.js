import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
import BookingForm from "@/components/BookingForm";
import SeatBooker from "@/components/SeatBooker";
import BookingFormV2 from "@/components/form-components/BookingFormV2";
import Footer from "@/components/Footer";

export default function BookingPage() {
  const [type, setType] = useState("Mässplats");
  return (
    <>
      <NextSeo noindex={true} />
      <Header changeOnScroll />
      <BookingFormV2 />
      {/*  <BookingForm /> */}
      <Footer />
    </>
  );
}
