import React, { useContext, useRef } from "react";
import useWindowDimensions from "./utilities/useWindowDimensions";
import ResponsiveContainer from "./ResponsiveContainer";
import { ReactComponent as PodiumSVG } from "../../public/images/podium.svg";
import { ReactComponent as ShakeSVG } from "../../public/images/shake_hand.svg";
import { languageContext } from "../pages/_app";
const content = require("../../public/content/landing.json");
export default function InfoWithStars() {
  const [lang, setLang] = useContext(languageContext);
  return (
    <ResponsiveContainer className="info-with-icons">
      <div className="icons-info">
        <div className="icons-info--column">
          <div className="icons-info--icon"></div>
          <div>
            <h4>{content[lang].section4.title1}</h4>
            <p>{content[lang].section4.body1}</p>
          </div>
        </div>
        <div className="icons-info--column">
          <div className="icons-info--icon"></div>
          <div>
            <h4>{content[lang].section4.title2}</h4>
            <p>{content[lang].section4.body2}</p>
          </div>
        </div>
      </div>
      <div className="icons-button"></div>
    </ResponsiveContainer>
  );
}
