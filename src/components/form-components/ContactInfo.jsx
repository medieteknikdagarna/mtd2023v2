import React from "react";
import Wing from "@/components/form-components/Wing";
import ContactInput from "./ContactInput";

export default function ContactInfo({ register, lang, errors }) {
  return (
    <>
      <Wing />
      <div>
        <ContactInput
          register={register}
          lang={lang}
          errors={errors.contact}
          type={"text"}
          id={"contact"}
          text={lang === "sv" ? "Kontaktperson" : "Name"}
        />
        <ContactInput
          register={register}
          lang={lang}
          errors={errors.company}
          type={"text"}
          id={"company"}
          text={lang === "sv" ? "Företag" : "Company name"}
        />
        <ContactInput
          register={register}
          lang={lang}
          errors={errors.companyadress}
          type={"text"}
          id={"companyadress"}
          text={lang === "sv" ? "Företagsadress" : "Company adress"}
        />
        <ContactInput
          register={register}
          lang={lang}
          errors={errors.email}
          type={"email"}
          id={"email"}
          text={"Email"}
        />
        <ContactInput
          register={register}
          lang={lang}
          errors={errors.tel}
          type={"tel"}
          id={"tel"}
          text={"Tel"}
        />
        <ContactInput
          register={register}
          lang={lang}
          errors={errors.description}
          type={"text"}
          id={"description"}
          text={
            lang === "sv"
              ? "Beskrivning av företag för app och hemsida"
              : "Description of company for app and websire"
          }
        />
      </div>
    </>
  );
}
