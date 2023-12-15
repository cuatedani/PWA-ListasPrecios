import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";

const PricesListTabs = [
    "LISTA_PRECIOS",
    "PRESENTACION_PRECIOS",
    "CONDICION_ROLES",
    "CONDICION_PRODUCTO",
    "NEGOCIOS"
];

const PricesListNavTab = ({
    setCurrentRowInPricesListTab,
    setCurrentTabInPrincipalTab,
    setPriceListTabInPrincipalTabIsSelected,
}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);
        console.log("entro al handleChange", e.target.innerText.toUpperCase());
        //Equipo 2: actualizar el nombre de la pestaña seleccionada.
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
        //Equipo 2: cada que realice un click en algun tap page
        //reiniciamos el valor del tap pase de business a false.
        setPriceListTabInPrincipalTabIsSelected(false);
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
                value={currenTabIndex}
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
                            disabled={setCurrentRowInPricesListTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default PricesListNavTab;