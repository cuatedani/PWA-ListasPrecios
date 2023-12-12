import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { Link, useHistory } from "react-router-dom";
const InstitutesTabs = ["Institutes", "Negocios"];

const InstitutesNavTab = ({
  currentRowInInstitutesTab,
  setCurrentTabInPrincipalTab,
  setBusinessTabInPrincipalTabIsSelected,
}) => {
  const [currenTabIndex, setCurrentTabIndex] = useState(0);

  const handleChange = (e) => {
    console.log("entro al handleChange", e.target.innerText.toUpperCase());
    //FIC: actualizar el nombre de la pestaña seleccionada.
    setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
    //FIC: cada que realice un click en algun tap page
    //reiniciamos el valor del tap pase de business a false.
    setBusinessTabInPrincipalTabIsSelected(false);
    //FIC: opciones (subdocumentos de la coleccion principal de institutos).
    switch (e.target.innerText.toUpperCase()) {
      case "INSTITUTES":
        setCurrentTabIndex(0);
        break;
      case "NEGOCIOS":
        setCurrentTabIndex(1);
        break;
    }

    if (e.target.innerText.toUpperCase() == "NEGOCIOS")
      setBusinessTabInPrincipalTabIsSelected(true);
  };

  return (
    <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
      <Tabs
        value={currenTabIndex}
        variant={"fullWidth"}
        onChange={handleChange}
        aria-label="icon tabs example"
        textColor="primary"
      >
        {InstitutesTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              label={tab}
              disabled={currentRowInInstitutesTab === null}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
export default InstitutesNavTab;