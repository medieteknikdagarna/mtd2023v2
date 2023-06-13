import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Header from "../components/Header";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import SeatBooker from "@/components/SeatBooker";

export default function BookingPage() {
  return (
    <>
      <NextSeo noindex={true} />
      <div className="booking-main">
        <Header changeOnScroll />
        <BookingForm />
      </div>
      <Footer />
    </>
  );
}
