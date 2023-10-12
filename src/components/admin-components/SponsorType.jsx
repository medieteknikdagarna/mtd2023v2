import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminModal from "./AdminModal";
import { AiOutlineCheck } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function SponsorType({ sponsor, setTotal, maxAmount }) {
  const [totalNumberOfSponsorType, setTotalNumberOfSponsorType] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);
  const [currentComp, setCurrentComp] = useState(null);

  const [companyNames, setCompanyNames] = useState([]);
  const fetchData = async () => {
    axios.get(`/api/company`).then((response) => {
      const filteredCompanies = response.data.filter(
        (company) => company.sponsor === sponsor
      );
      setCompanyNames(filteredCompanies);
      setTotal(response.data.length);
      setTotalNumberOfSponsorType(filteredCompanies.length);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDetails = async (companyName) => {
    try {
      const response = await axios.get("/api/companyDetail", {
        params: { currentComp: companyName },
      });
      setCurrentComp(response.data);
      setShouldShow(true); // Set shouldShow after the response has been received
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching details:", error);
    }
  };

  const handleClose = () => {
    setShouldShow(false);
  };
  return (
    <div className="admin_sponsor">
      <div className="admin_sponsor_top">
        <h2 className="admin_sponsor_top_item">{sponsor}</h2>
        <div className="admin_sponsor_top_item">
          <h2 style={{ color: "white", fontSize: "2rem" }}>
            {totalNumberOfSponsorType}/{maxAmount}
          </h2>
        </div>
      </div>
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
              <span>
                {company.name}
                {company.signed && (
                  <AiOutlineCheck
                    fill="white"
                    style={{ marginLeft: "0.3rem" }}
                  />
                )}
              </span>
            </div>
          );
        })}
      </div>
      {shouldShow && (
        <AdminModal currentComp={currentComp} handleClose={handleClose} />
      )}
    </div>
  );
}
