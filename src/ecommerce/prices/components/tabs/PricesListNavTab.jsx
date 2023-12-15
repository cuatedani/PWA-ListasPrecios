import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";

const PricesListTabs = [
    "LISTA_PRECIOS",
    "PRESENTACION_PRECIOS",
    "COND_ROLES",
    "COND_PRODUCTO",
    "NEGOCIOS"
];

const PricesListNavTab = ({
    CurrentRowInPricesListTab,
    setCurrentTabInPrincipalTab,
    setCurrentNameTabInPrincipalTabIsSelected,
}) => {
    const [CurrentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);
        console.log("Entró al handleChange", e.target.innerText.toUpperCase());
        //Equipo 2: actualizar el nombre de la pestaña seleccionada.
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
        //Equipo 2: opciones (subdocumentos de la coleccion principal de institutos).
        switch (e.target.innerText.toUpperCase()) {
            case "LISTA_PRECIOS":
                setCurrentTabIndex(0);
                break;
            case "PRESENTACION_PRECIOS":
                setCurrentTabIndex(1);
                break;
            case "CONDICION_ROLES":
                setCurrentTabIndex(2);
                break;
            case "CONDICION_PRODUCTO":
                setCurrentTabIndex(3);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(4);
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
                value={CurrentTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {PricesListTabs.map((tab) => {
                    return (
                        <Tab
                            key={tab}
                            label={tab}
                            disabled={CurrentRowInPricesListTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default PricesListNavTab;