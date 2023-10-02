import { useEffect, useState } from "react";
import axios from "axios";

export default function CompanyList({ setCurrentComp }) {
  const [companyNames, setCompanyNames] = useState([]);

  const fetchData = async () => {
    axios.get("/api/company").then((response) => {
      setCompanyNames(response.data);
    });
  };

  const fetchDetails = async (currentComp) => {
    axios
      .get("/api/companyDetail", { params: { currentComp } })
      .then((response) => {
        setCurrentComp(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="admin_sidebar">
        <ul>
          <div className="admin_sidebar_list">
            {companyNames.map((company, index) => {
              return (
                <li key={index}>
                  <div
                    onClick={() => fetchDetails(company.name)}
                    className="admin_sidebar_item"
                  >
                    <span>{company.name}</span>
                  </div>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </>
  );
}
