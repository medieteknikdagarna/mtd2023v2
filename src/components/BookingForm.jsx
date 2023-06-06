import { useState, useEffect } from "react";
import { useForm, useController, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function BookingForm() {
  const [info, setInfo] = useState();
  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm({
      defaultValues: {
        logotyp: "",
        transport: "",
        bankettbiljetter: 0,
        bankettkost: [],
        antalpåmässdag: 0,
        mässkost: [],
      },
    });
  const { errors } = formState;
  const { fields: bankettField, append: bankettAppend } = useFieldArray({
    name: "bankettkost",
    control,
  });

  const {
    fields: mässField,
    append: mässAppend,
    remove: mässRemove,
  } = useFieldArray({
    name: "mässkost",
    control,
  });

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  const addBankettKost = () => {
    bankettAppend({ kost: "" });
  };
  const addMässKost = () => {
    const currentMässCount = mässField.length;
    const newMässCount = watch("antalpåmässa");
    if (newMässCount > currentMässCount) {
      mässAppend({ kost: "" });
    } else {
      mässRemove(newMässCount);
    }
  };

  return (
    <>
      <div style={{ paddingTop: "100px" }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <h2>Tillägg</h2>
          </div>
          <div>
            <h2>Mässdag</h2>
            <label htmlFor="antalpåmässa">Antal som kommer på mässdagen</label>
            <input
              type="number"
              id="antalpåmässa"
              placeholder="0"
              min={0}
              {...register("antalpåmässa", {
                valueAsNumber: true,
                onChange: addMässKost,
              })}
            />
            {watch("antalpåmässa") > 0 && (
              <div>
                <h3>Kost</h3>
                <div>
                  {mässField.map((kost, index) => {
                    return (
                      <div className="form-control" key={kost.id}>
                        <input
                          type="text"
                          {...register(`mässkost.${index}.kost`)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <h3>Montertransport</h3>
            <input
              type="radio"
              id="T_op1"
              value="op1"
              {...register("transport")}
            />
            <label htmlFor="T_op1">Skicka i förväg via godsmottagningen</label>
            <input
              type="radio"
              id="T_op2"
              value="op2"
              {...register("transport")}
            />
            <label htmlFor="T_op2">Tar med själv till mässan</label>
            <h3>Persontransport</h3>
            <input
              type="radio"
              id="persontransport-ja"
              value="Ja"
              {...register("persontransport")}
            />
            <label htmlFor="persontransport-ja">Ja</label>
            <input
              type="radio"
              id="persontransport-nej"
              value="Nej"
              {...register("persontransport")}
            />
            <label htmlFor="persontransport-nej">Nej</label>
            <h3>Extrabord</h3>
            <label htmlFor="extrabord">Extra ståbord</label>
            <input
              type="number"
              id="extrabord"
              {...register("extrabord", { valueAsNumber: true })}
            />
            <h3>Extrastol</h3>
            <label htmlFor="extrastol">Extra stol</label>
            <input
              type="number"
              id="extrastol"
              {...register("extrastol", { valueAsNumber: true })}
            />
            <h3>Beställ TV</h3>
            <input
              type="radio"
              id="TV-op1"
              value="TV-op1"
              {...register("TV")}
            />
            <label htmlFor="TV-op1">TV-op1</label>
            <input
              type="radio"
              id="TV-op2"
              value="TV-op2"
              {...register("TV")}
            />
            <label htmlFor="TV-op2">TV-op2</label>
            <h3>Antal enheter trådlöst nätverk</h3>
            <input
              type="number"
              id="trådlösaenheter"
              {...register("trådlösaenheter", { valueAsNumber: true })}
            />
            <h3>Drar mycket el</h3>
            <input
              type="text"
              id="elenhet"
              {...register("elenhet", {
                required: "hej",
              })}
            />
            <h3>Tjänster för besökare</h3>
            <input
              type="radio"
              id="exjobb"
              value="exjobb"
              {...register("tjänst")}
            />
            <label htmlFor="exjobb">exjobb</label>
            <input
              type="radio"
              id="praktik"
              value="praktik"
              {...register("tjänst")}
            />
            <label htmlFor="praktik">Praktik</label>
          </div>
          <div>
            <h2>Bankett</h2>
            <label htmlFor="Bankettbiljetter">Bankettbiljetter</label>
            <input
              type="number"
              id="Bankettbiljetter"
              {...register("bankettbiljetter", {
                valueAsNumber: true,
                onChange: addBankettKost,
              })}
            />
            {watch("bankettbiljetter") > 0 && (
              <div>
                <h3>Kost</h3>
                <div>
                  {bankettField.map((kost, index) => {
                    return (
                      <div className="form-control" key={kost.id}>
                        <input
                          type="text"
                          {...register(`bankettkost.${index}.kost`)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div>
            <h2>Övrigt</h2>
          </div>
          <div>
            <label htmlFor="logotyp">Logotyp</label>
            <input
              type="text"
              id="logotyp"
              {...register("logotyp", {
                required: "hej",
              })}
            />
            <p>{errors.logotyp?.message}</p>
            <h3>Faktureringsadreass</h3>
            <label htmlFor="fakurering">Faktureringsuppgifter</label>
            <input
              type="email"
              id="fakturering"
              {...register("fakturering", {
                required: "hej",
              })}
            />
            <h3>Firmateknare</h3>
            <label htmlFor="firmateknare">Firmateknare</label>
            <input
              type="text"
              id="firmateknare"
              {...register("firmateknare", {
                required: "hej",
              })}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "2rem",
              height: "1rem",
            }}
          />
        </form>
      </div>
    </>
  );
}
