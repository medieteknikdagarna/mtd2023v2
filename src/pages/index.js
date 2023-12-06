import React, { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import ExpoSvg from "../../public/images/expo_cube.svg";
import StandSvg from "../../public/images/stand.svg";
import InfoSection from "../components/InfoSection";
import AfterMovie from "../components/AfterMovie";
import Footer from "../components/Footer";
import InfoWithStars from "../components/InfoWithIcons";
import { languageContext } from "./_app";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MTBALL100 from "../../public/images/MTBALL100.png";
import SphereCanvas from "@/components/render-components/SphereCanvas";
import {
  faMapPin,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { NextSeo } from "next-seo";
import Image from "next/image";

const content = require("../../public/content/landing.json");

export default function LandingPage() {
  const [lang, setLang] = useContext(languageContext);
  const fbVideoUrl =
    "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fmedieteknikdagen%2Fvideos%2F1399763803536580%2F&show_text=false&width=560&t=0";
  return (
    <>
      <NextSeo
        title="Medieteknikdagen 2023"
        description="Medieteknikdagen är medieteknikstudenternas årliga arbetsmarknadsdag på Linköpings Universitet, Campus Norrköping. Säkra er plats genom att lämna en intresseanmälan!"
        canonical="https://www.medieteknikdagen.se/"
      />
      {
        <>
          <Header lightContrast changeOnScroll />
          <div className="video-container">
            <video id="background-video" autoPlay loop muted playsInline>
              <source
                src={require("public/images/renders/BOLL-VID2-fixed.mp4")}
                type="video/mp4"
              />
            </video>
            <ResponsiveContainer className="landing-container">
              <section className="landing-section">
                <div className="intro">
                  <h1>MTD</h1>
                  <div className="date-landing">
                    <span>
                      {lang === "sv" ? "6:e December" : "December 6th"} 2023
                    </span>
                  </div>
                  <div className="welcome">
                    <p>
                      {content[lang].section1.body[0]}
                      <br />
                      {content[lang].section1.body[1]}
                    </p>
                    <div className="landing-section--buttons">
                      <Button href="/foretag" type="primary" size="large">
                        {lang === "sv" ? "Företag" : "Companies"}
                      </Button>
                      <Button href="/studentEXPO" type="primary" size="large">
                        {lang === "sv" ? "StudentEXPO" : "StudentEXPO"}
                      </Button>
                      <Button
                        href="/massan"
                        style={{
                          borderColor: "white",
                          color: "var(--color-light)",
                        }}
                        type="secondary"
                        size="large"
                      >
                        {lang === "sv" ? "Om Mässan" : "The fair"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* <Image src={MTBALL100} alt="mtdball" width={500} height={500} /> */}
                {/*  <SphereCanvas /> */}
              </section>
            </ResponsiveContainer>
          </div>
          <ResponsiveContainer className={"welcome-background"}>
            <section className="welcome-section">
              <InfoSection
                className="welcome-info"
                tag="MTD"
                title={lang === "sv" ? "Välkommen!" : "Welcome!"}
                body={content[lang].section2.body}
              >
                <div className="landing-fair-info">
                  <div className="landing-fair-info-row-container">
                    <div className="landing-fair-info--row">
                      <FontAwesomeIcon size="2x" icon={faCalendar} />
                      <span>{lang === "sv" ? "6:e Dec" : "Dec 6th"} 2023</span>
                    </div>
                    <div className="landing-fair-info--row">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="landning-fair-icon"
                        color="white"
                      />
                      <span>09:00 - 15:00</span>
                    </div>
                    <div className="landing-fair-info--row">
                      <FontAwesomeIcon size="xs" icon={faMapPin} />
                      <span>Täppan Campus Norrköping</span>
                    </div>
                  </div>
                </div>
                <Button href="/massan" type="primary" size="medium">
                  {lang === "sv" ? "Läs mer" : "Read more"}
                </Button>
              </InfoSection>
              <div className="calendar">
                <ExpoSvg />
              </div>
            </section>
          </ResponsiveContainer>
          <InfoWithStars />
          <ResponsiveContainer className="after-movie-background">
            <section className="after-movie-section">
              <div className="after-movie-title">
                <InfoSection
                  className="after-movie"
                  tag={lang === "sv" ? "Tidigare år" : "PREVIOUS YEARS"}
                  title="After movie 2020"
                  body={content[lang].section5.body}
                />
              </div>
              <AfterMovie src={fbVideoUrl} />
            </section>
          </ResponsiveContainer>
          <Footer />
        </>
      }
    </>
  );
}
