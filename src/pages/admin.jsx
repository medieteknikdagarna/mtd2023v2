import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import CompanyList from "@/components/admin-components/CompanyList";
import CompanyDetails from "@/components/admin-components/CompanyDetails";
import SponsorType from "@/components/admin-components/SponsorType";
export default function AdminPage() {
  const [totalNumberOfCompanies, setNumber] = useState(0);
  const [currentComp, setCurrentComp] = useState([]);
  const changeCompany = (name) => {
    setCurrentComp(name);
  };
  const [logedIn, setlogedIn] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const submitForm = (values) => {
    console.log(values.password);
    if (values.password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setlogedIn(true);
    }
  };

  console.log(currentComp);

  return (
    <>
      {!logedIn ? (
        <div className="admin_login">
          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <div className="admin_form">
              <label>Lösenord</label>
              <input type="text" {...register("password")} />
              <button type="submit" style={{ color: "black" }}>
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="admin_title">
            <h1 style={{ fontSize: "5rem" }}>MTD 2023</h1>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <h2>Antal företag - </h2>
              <span>{totalNumberOfCompanies}</span>
            </div>
          </div>
          <div className="admin_container">
            {/*  <CompanyList setCurrentComp={changeCompany} />
            <CompanyDetails currentComp={currentComp} /> */}
            <SponsorType sponsor="Guld" setTotal={setNumber} maxAmount={5} />
            <SponsorType sponsor="Silver" setTotal={setNumber} maxAmount={10} />
            <SponsorType sponsor="Brons" setTotal={setNumber} maxAmount={32} />
          </div>
        </>
      )}
    </>
  );
}
