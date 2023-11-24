import { useState, useEffect, useRef } from "react";
import { NextSeo } from "next-seo";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tilt from "react-parallax-tilt";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";
import axios from "axios";
import CompanyText from "@/public/content/company_information.json";
import Image from "next/image";
import Modal from "@/components/foretag-components/ForetagModal";

const CompanyCard = ({ name, index, type }) => {
  const [currentComp, setCurrentComp] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchDetails = async (companyName) => {
    try {
      const response = await axios.get("/api/companyDetail", {
        params: { currentComp: companyName },
      });
      setCurrentComp(response.data);
      setLoading(true);
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching details:", error);
    }
  };
  const imageSrc = `/images/companies/${type}/${CompanyText.sv.companies[type][index].logo}`;
  let imgSize = "";
  if (type === "gold") {
    imgSize = "20rem";
  } else {
    imgSize = "18rem";
  }
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  const HandleOpen = () => {
    if (modalOpen) {
      close();
    } else {
      open();
    }
    fetchDetails(name);
  };
  return (
    <>
      <Tilt>
        <motion.div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="card_container"
          id={type}
          onClick={HandleOpen}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div
            className="card_content"
            /*   id={type} */
            /*  style={{ width: width, minHeight: height }} */
          >
            <div className="card_image">
              <Image
                src={imageSrc}
                style={{ objectFit: "scale-down" }}
                alt="Missing Image"
                fill
              />
            </div>
            <div className="card_info">
              <h2 style={{ wordBreak: "break-word" }}>{name}</h2>
              <h3
                style={{
                  color:
                    type === "bronze"
                      ? "#804a00"
                      : type === "silver"
                      ? "#c0c0c0"
                      : type === "gold"
                      ? "#b3a34d"
                      : "white",
                }}
              >
                {CompanyText.sv.companies[type][index].partner}
              </h3>
              {type === "gold" && (
                <div>
                  <span>
                    {CompanyText.sv.companies[type][index].information}
                  </span>

                  <div className="foretag_card_offer">
                    {CompanyText.sv.companies[type][index].offer.map(
                      (data, index) => (
                        <div className="offer_circle" key={index}>
                          <p>{data}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              {/*  <span>{CompanyText.sv.companies[type][index].information}</span> */}
            </div>
          </div>
        </motion.div>
      </Tilt>
      <AnimatePresence initial={false} mode="wait">
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            currentComp={currentComp}
            imageLink={imageSrc}
            isLoaded={loading}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default function ForetagV2() {
  const [goldCompanies, setGoldCompanies] = useState();
  const [silverCompanies, setSilverCompanies] = useState();
  const [bronsCompanies, setBronsCompanies] = useState();
  const [doneLoading, setDoneLoading] = useState(false);

  const fetchData = async () => {
    axios.get("/api/company").then((response) => {
      const guld = response.data.filter(
        (company) => company.sponsor === "Guld"
      );
      setGoldCompanies(guld);

      const silver = response.data.filter(
        (company) => company.sponsor === "Silver"
      );
      setSilverCompanies(silver);
      const brons = response.data.filter(
        (company) => company.sponsor === "Brons"
      );
      setBronsCompanies(brons);

      setDoneLoading(true);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      <div className="container">
        <h1>Företag Medieteknikdagen 2023</h1>
        <h3>Nedan listas alla företag som deltar på Medieteknikdagen i år.</h3>
        {doneLoading ? (
          <>
            <div className="card_div">
              {goldCompanies.map((företag, index) => (
                <CompanyCard
                  key={företag.name}
                  index={index}
                  name={företag.name}
                  type="gold"
                  width="30vw"
                  height="70vh"
                />
              ))}
            </div>
            <div className="card_div_silver">
              {silverCompanies.map((företag, index) => (
                <CompanyCard
                  key={företag.name}
                  index={index}
                  name={företag.name}
                  type="silver"
                  width="20vw"
                  height="25rem"
                />
              ))}
            </div>
            <div className="card_div_silver">
              {bronsCompanies.map((företag, index) => (
                <CompanyCard
                  key={företag.name}
                  index={index}
                  name={företag.name}
                  type="bronze"
                  width="20vw"
                  height="20rem"
                />
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20vh",
            }}
          >
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
