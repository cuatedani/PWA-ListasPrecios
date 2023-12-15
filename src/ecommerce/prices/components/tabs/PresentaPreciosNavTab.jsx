import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";

const PresentaPreciosTabs = [
    "PRESENTACION_PRECIOS"
];

const PresentaPreciosNavTab = ({
    currentRowInPricesListTab,
    setCurrentTabInPrincipalTab,
    setPresentaPreciosTabInPrincipalTabIsSelected,
}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);
        console.log("entro al handleChange", e.target.innerText.toUpperCase());

        //Equipo 2: actualizar el nombre de la pestaña seleccionada.
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());

        //Equipo 2: cada que realice un click en algun tap page
        //reiniciamos el valor del tap pase de business a false.
        //Equipo 2: opciones (subdocumentos de la coleccion principal de institutos).
        switch (e.target.innerText.toUpperCase()) {
            case "PRESENTACION_PRECIOS":
                setCurrentTabIndex(0);
                break;
        }
    };

    return (
        <Box
            sx={{
                border: (theme) => `2px solid ${theme.palette.divider}`,
                mx: 1,
                padding: 0.5
            }}
        >
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
                            disabled={currentRowInPricesListTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default PresentaPreciosNavTab;