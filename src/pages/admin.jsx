import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import CompanyList from "@/components/CompanyList";
import CompanyDetails from "@/components/CompanyDetails";

export default function AdminPage() {
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
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="admin_container">
            <CompanyList setCurrentComp={changeCompany} />
            <CompanyDetails currentComp={currentComp} />
          </div>
        </>
      )}
    </>
  );
}
