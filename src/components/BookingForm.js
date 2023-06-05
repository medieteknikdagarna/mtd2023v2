import { useState } from "react";
import { useForm, useController } from "react-hook-form";

export default function BookingForm() {
  const [info, setInfo] = useState();
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (formValues) => {
    setInfo(formValues);
    console.log(info);
  };

  return (
    <>
      <div style={{ paddingTop: "100px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Tillägg</h2>
          </div>
          <div>
            <h2>Mässdag</h2>
            <h3>Montertransport</h3>
            <input type="radio" {...register("transport")} />
            <label htmlFor="transport">godsmottagning</label>
            <input type="radio" {...register("transport")} />
            <label htmlFor="transport">Själv</label>
          </div>
          <div>
            <h2>Bankett</h2>
          </div>
          <div>
            <h2>Övrigt</h2>
          </div>
          <div>
            <label htmlFor="logotyp">Logotyp</label>
            <input {...register("logotyp")}></input>
          </div>
          <div>
            <label htmlFor="Bankettbiljetter">Bankettbiljetter</label>
            <input type="number" {...register("bankettbiljetter")}></input>
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
