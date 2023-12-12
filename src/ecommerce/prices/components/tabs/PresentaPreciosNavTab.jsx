import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { Link, useHistory } from "react-router-dom";
const PresentaPreciosTab = ["Presenta Precios"];

const PresentaPreciosNavTab = ({
    currentRowInPresentaPreciosTab,
    setCurrentTabInPrincipalTab,
}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        console.log("entro al handleChange", e.target.innerText.toUpperCase());
        //Equipo 2: actualizar el nombre de la pestaña seleccionada.
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
        //Equipo 2: cada que realice un click en algun tap page
        //reiniciamos el valor del tap pase de business a false.
        //Equipo 2: opciones (subdocumentos de la coleccion principal de institutos).
        switch (e.target.innerText.toUpperCase()) {
            case "PRESENTA PRECIOS":
                setCurrentTabIndex(0);
                break;
        }
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
                {PresentaPreciosTabs.map((tab) => {
                    return (
                        <Tab
                            key={tab}
                            label={tab}
                            disabled={currentRowInPresentaPreciosTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default PresentaPreciosNavTab;