import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { Link, useHistory } from "react-router-dom";
import PricesListTab from '../tabs/PricesListTab';
import NegociosTab from '../tabs/NegociosTab';
import PresentaPreciosTab from '../tabs/PresentaPreciosTab';
import CondicionRolesTab from '../tabs/CondicionRolesTab';
import CondicionProductoTab from '../tabs/CondicionProductoTab';
const PricesListTabs = ["PricesList", "NegociosTab", "PresentaPreciosTab", "CondicionRolesTab", "CondicionProductoTab"];

const PricesListNavTab = ({
    currentRowInPricesListTab,
    setCurrentTabInPrincipalTab,
    setBusinessTabInPrincipalTabIsSelected,
}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        console.log("entro al handleChange", e.target.innerText.toUpperCase());
        //Equipo 2: actualizar el nombre de la pestaña seleccionada.
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
        //Equipo 2: cada que realice un click en algun tap page
        //reiniciamos el valor del tap pase de business a false.
        setBusinessTabInPrincipalTabIsSelected(false);
        //Equipo 2: opciones (subdocumentos de la coleccion principal de institutos).
        switch (e.target.innerText.toUpperCase()) {
            case "PRICESLIST":
                setCurrentTabIndex(0);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(1);
                break;
            case "PRESENTACION PRECIOS":
                setCurrentTabIndex(2);
                break;
            case "CONDICION ROLES":
                setCurrentTabIndex(3);
                break;
            case "CONDICION PRODUCTO":
                setCurrentTabIndex(4);
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
                {PricesListTabs.map((tab) => {
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
export default PricesListNavTab;