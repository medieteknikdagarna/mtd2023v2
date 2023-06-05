import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  const [type, setType] = useState("Mässplats");
  return (
    <>
      <NextSeo noindex={true} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Header changeOnScroll />
        <BookingForm />
      </div>
    </>
  );
}
