import React from "react";

export default function AdminModal({ currentComp, handleClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div className="admin_company_details">
          {currentComp.map((data, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexFlow: "column",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1 key={index}>{data.data.company}</h1>
                  <h3
                    style={{
                      fontSize: "2rem",
                      color: "white",
                      marginLeft: "1rem",
                      marginTop: "0",
                    }}
                  >
                    - {data.data.sponsor}
                  </h3>
                </div>
                <div className="modal_column_container">
                  <div className="modal_item">
                    <h2>Kontakt</h2>
                    <div className="modal_company_info">
                      <p> {data.data.contact}</p>
                      <p> {data.data.tel}</p>
                      <p> {data.data.email}</p>
                      <p> {data.data.companyadress}</p>
                      <p style={{ color: "orange" }}>Fakturering</p>
                      <p> {data.data.fakturering}</p>
                      <p> {data.data.firmatecknare}</p>
                      {data.data.organisationsnummer !== null && (
                        <p>{data.data.organisationsnummer}</p>
                      )}
                    </div>
                    <h2 style={{ marginTop: "1rem" }}>Bankett</h2>
                    <div className="modal_company_info">
                      <p>
                        Antal bankettbiljetter: {data.data.bankettbiljetter}
                      </p>
                      <div>
                        {data.data.bankettkost.map((item, itemIndex) => (
                          <span
                            id="admin_listitem"
                            key={itemIndex}
                            style={{ marginLeft: "1rem" }}
                          >
                            <p>Kost: {item.kost}</p>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="modal_item">
                    <h2>Mässinfo</h2>
                    <div>
                      <span id="admin_listitem">
                        <h4>Monter (våning, plats):</h4>
                        {data.data.floor},{data.data.seat}
                      </span>
                    </div>
                    <div className="modal_company_info">
                      <p> Antal på mässdagen: {data.data.antalpåmässa}</p>
                      <div>
                        {data.data.mässkost.map((item, itemIndex) => (
                          <span
                            id="admin_listitem"
                            key={itemIndex}
                            style={{ marginLeft: "1rem" }}
                          >
                            <p>Kost: {item.kost}</p>
                          </span>
                        ))}
                      </div>
                      <p>Mässtransport: {data.data.montertransport}</p>
                      <p>Persontransport: {data.data.persontransport}</p>
                      <p>Trådlösa enheter: {data.data.trådlösaenheter}</p>
                      <p>Antal extrabord: {data.data.extrabord}</p>
                      <p>Antal extrastolar: {data.data.extrastol}</p>
                      <p>Bokad TV: {data.data.TV}</p>
                      <p>Drar mycket ström: {data.data.elenhet}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <p style={{ marginRight: "0.5rem" }}>Tjänster:</p>
                      {data.data.tjänst.length > 0 ? (
                        <>
                          {data.data.tjänst.map((item, itemIndex) => (
                            <span
                              id="admin_listitem"
                              key={itemIndex}
                              style={{ marginLeft: "1rem" }}
                            >
                              <p>{item}</p>
                            </span>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ width: "50rem" }}>
                  <p>Beskrivning av företaget </p>
                  <p>{data.data.description}</p>
                </div>

                {/*
                <span id="admin_listitem" style={{ fontSize: "0.8rem" }}>
                  <h4>Beskrivning</h4>
                  {data.data.description}
                </span> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
