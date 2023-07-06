export default function CompanyDetails({ currentComp }) {
  return (
    <>
      <div className="admin_companylist">
        {currentComp.map((data, index) => {
          console.log(data.data.mässkost[0].kost);
          return (
            <div
              key={index}
              style={{ display: "flex", flexFlow: "column", gap: "1rem" }}
            >
              <h1 key={index}>{data.data.company}</h1>

              <span id="admin_listitem">
                <h4>Sponsor: </h4>
                {data.data.sponsor}
              </span>

              <div>
                <span id="admin_listitem">
                  <h4>Monter (våning, plats):</h4>
                  {data.data.floor},{data.data.seat}
                </span>
              </div>

              <span id="admin_listitem">
                <h4>Kontaktperson: </h4>
                {data.data.contact}
              </span>
              <span id="admin_listitem">
                <h4>Företagsadress: </h4>
                {data.data.companyadress}
              </span>
              <span id="admin_listitem">
                <h4>Epost: </h4>
                {data.data.email}
              </span>
              <span id="admin_listitem">
                <h4>Faktureringsepost: </h4>
                {data.data.fakturering}
              </span>
              <span id="admin_listitem">
                <h4>Firmatecknare: </h4>
                {data.data.firmatecknare}
              </span>
              <span id="admin_listitem">
                <h4>Telefon: </h4>
                {data.data.tel}
              </span>
              <span id="admin_listitem">
                <h4>Antal som kommer på mässdagen: </h4>
                {data.data.antalpåmässa}
              </span>
              <div>
                {data.data.mässkost.map((item, itemIndex) => (
                  <span id="admin_listitem" key={itemIndex}>
                    <h4>Kost: </h4>
                    {item.kost},{" "}
                  </span>
                ))}
              </div>
              <span id="admin_listitem">
                <h4>Montertransport: </h4>
                {data.data.montertransport}
              </span>
              <span id="admin_listitem">
                <h4>Persontransport: </h4>
                {data.data.persontransport}
              </span>
              <span id="admin_listitem">
                <h4>Antalet trådlösa enhter: </h4>
                {data.data.trådlösaenheter}
              </span>
              <span id="admin_listitem">
                {" "}
                <h4>Antal extrabord: </h4>
                {data.data.extrabord}
              </span>
              <span id="admin_listitem">
                {" "}
                <h4>Antal extrastolar: </h4>
                {data.data.extrastol}
              </span>
              <span id="admin_listitem">
                {" "}
                <h4>Storlek på beställd TV(Om tomt så är det ingen): </h4>
                {data.data.TV}
              </span>
              <span id="admin_listitem">
                <h4>Enheter som drar extra mycket el: </h4>
                {data.data.elenhet}
              </span>
              <div style={{ display: "flex" }}>
                <h4 style={{ marginRight: "0.5rem" }}>Erbjuder tjänster: </h4>
                {data.data.tjänst.map((item, itemIndex) => (
                  <span id="admin_listitem" key={itemIndex}>
                    {item},
                  </span>
                ))}
              </div>
              <span id="admin_listitem">
                <h4>Antal bankettbiljetter: </h4>
                {data.data.bankettbiljetter}
              </span>
              <div>
                {data.data.bankettkost.map((item, itemIndex) => (
                  <span id="admin_listitem" key={itemIndex}>
                    <h4>Kost: </h4>
                    {item.kost},{" "}
                  </span>
                ))}
              </div>
              <span id="admin_listitem" style={{ fontSize: "0.8rem" }}>
                <h4>Beskrivning</h4>
                {data.data.description}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
