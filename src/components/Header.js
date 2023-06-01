import React, { useEffect, useState } from "react";
import MTDSvg from "../../public/images/mtd.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import MenuIcon from "../../public/images/menu_icon.svg";
import Menu from "./Menu";
import Link from "next/link";
import LanguageFlag from "./LanguageFlag";
import Image from "next/image";

export const menuActiveContext = React.createContext();

export default function Header({
  shadow = false,
  changeOnScroll = false,
  lightContrast = false,
  style = {},
}) {
  const className = lightContrast ? "header-light" : "header";
  if (shadow) {
    style["boxShadow"] = "0px 0px 18px -8px";
  }

  const [menuActive, setMenuActive] = useState(false);

  const [lastscrollPos, setlastScrollPos] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const pos = window.pageYOffset;

    setlastScrollPos(pos);
  };

  {
    /*<MTDSvg className="header-logo" />  SKA RETURNAS*/
  }
  return (
    <header
      style={style}
      className={
        lastscrollPos >= 50 && changeOnScroll
          ? className + " header-scroll"
          : className
      }
    >
      <Menu
        show={menuActive}
        onExit={() => setMenuActive(false)}
        key={1}
      ></Menu>
      <div className="logo-container">
        <Link href="/" legacyBehavior>
          <Image src={MTDSvg} className="header-logo" alt="MTD" />
        </Link>
        <div className="nav-items">
          <Link href="/" legacyBehavior>
            <h2>MTD</h2>
          </Link>
          <div className="icons">
            <LanguageFlag />
            <div className="spacer"></div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/medieteknikdagen"
              className="icon-link"
            >
              <FontAwesomeIcon className="brand-icons" icon={faFacebook} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/medieteknikdagen/"
              className="icon-link"
            >
              <FontAwesomeIcon className="brand-icons" icon={faInstagram} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/company/medieteknikdagarna-2014/"
              className="icon-link"
            >
              <FontAwesomeIcon className="brand-icons" icon={faLinkedin} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/c/Medieteknikdagen"
              className="icon-link"
            >
              <FontAwesomeIcon className="brand-icons" icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>
      <div className="menu-icon">
        <i className="menu-icon--icon" onClick={() => setMenuActive(true)}>
          {/*<MenuIcon />*/}
        </i>
      </div>
    </header>
  );
}
