import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { Link, useHistory } from "react-router-dom";
const CondicionProductoTab = ["Condicion Producto", "Condicion"];

const CondicionProductoNavTab = ({
    currentRowInCondicionProductoTab,
    setCurrentTabInPrincipalTab,
    setCondicionTabInPrincipalTabIsSelected,
}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        console.log("entro al handleChange", e.target.innerText.toUpperCase());
        //Equipo 2: actualizar el nombre de la pestaña seleccionada.
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
        //Equipo 2: cada que realice un click en algun tap page
        //reiniciamos el valor del tap pase de business a false.
        setCondicionInPrincipalTabIsSelected(false);
        //Equipo 2: opciones (subdocumentos de la coleccion principal de institutos).
        switch (e.target.innerText.toUpperCase()) {
            case "CONDICION PRODUCTO":
                setCurrentTabIndex(0);
                break;
            case "CONDICION":
                setCurrentTabIndex(1);
                break;
        }

        if (e.target.innerText.toUpperCase() == "CONDICION")
            setCondicionTabInPrincipalTabIsSelected(true);
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
                {CondicionProductoTabs.map((tab) => {
                    return (
                        <Tab
                            key={tab}
                            label={tab}
                            disabled={currentRowInCondicionProductoTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default CondicionProductoNavTab;