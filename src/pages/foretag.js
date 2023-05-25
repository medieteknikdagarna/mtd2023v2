import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoSection from "../components/InfoSection";
import LoadingSpinner from "../components/LoadingSpinner";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { importAll } from "./massan";
import { languageContext } from "./_app";
const content = require("../public/content/companies.json");
import { NextSeo } from "next-seo";
import CompaniesWithInfoHeadSponsor, {
  CompaniesWithInfoSponsor,
  CompaniesWithInfoStandard,
} from "../components/CompaniesWithInfo";
export function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  if (array.length == 2) {
    let temp = Math.round(Math.random());
    if (temp == 0) {
      return [array[1], array[0]];
    } else {
      return array;
    }
  }

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function CompanyImagesGold() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const images_import = importAll(
      require.context("../public/images/companies/gold", false, /\.(svg)$/)
    );
    let imgs = [];
    for (let key in images_import) {
      if (key.includes("svg")) {
        imgs.push(images_import[key].default);
      }
    }
    setImages(shuffleArray(imgs));
  }, []);

  return (
    <div className="companies-container--gold">
      {(!images && <LoadingSpinner />) || images.map((i) => i())}
    </div>
  );
}

export function CompanyImagesSilver() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const images_import = importAll(
      require.context("../public/images/companies/silver", false, /\.(svg)$/)
    );
    let imgs = [];
    for (let key in images_import) {
      if (key.includes("svg")) {
        imgs.push(images_import[key].default);
      }
    }
    setImages(shuffleArray(imgs));
  }, []);

  return (
    <div className="companies-container--silver">
      {(!images && <LoadingSpinner />) || images.map((i) => i())}
    </div>
  );
}

export default function Companies() {
  const [lang, setLang] = useContext(languageContext);

  return (
    <div>
      <NextSeo
        title="Företag"
        description="Här listar vi ett knippe av alla företag som har varit med oss genom åren. Vi hoppas att kunna ha med ert företag nästa år!"
        canonical="https://www.medieteknikdagen.se/foretag"
      />
      <Header
        style={{ backgroundColor: "black" }}
        lightContrast
        changeOnScroll
      />
      <ResponsiveContainer className="foretag--companies">
        <InfoSection
          tag=""
          title={content[lang].title}
          body={content[lang].body}
        />
        <CompaniesWithInfoHeadSponsor />
        <CompaniesWithInfoSponsor />
        <CompaniesWithInfoStandard />
      </ResponsiveContainer>
      <Footer />
    </div>
  );
}
