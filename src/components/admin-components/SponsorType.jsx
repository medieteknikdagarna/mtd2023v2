import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SponsorType({ sponsor, setTotal }) {
  const [companyNames, setCompanyNames] = useState([]);
  const fetchData = async () => {
    axios.get(`/api/company`).then((response) => {
      const filteredCompanies = response.data.filter(
        (company) => company.sponsor === sponsor
      );
      setCompanyNames(filteredCompanies);
      console.log(response);
      setTotal(response.data.length);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin_sponsor">
      <h2>{sponsor}</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {companyNames.map((company, index) => {
          return (
            <div
              key={index}
              onClick={() => fetchDetails(company.name)}
              className="admin_sponsor_item"
            >
              <span>{company.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
