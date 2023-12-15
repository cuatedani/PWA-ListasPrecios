import { Box } from "@mui/material";
import { useState } from "react";
import PricesListNavTab from "../components/tabs/PricesListNavTab";
import PricesListTab from "../components/tabs/PricesListTab";
import PresentaPreciosTab from "../components/tabs/PresentaPreciosTab";
import CondRolesTab from "../components/tabs/CondicionRolesTab";
import CondProdServTab from "../components/tabs/CondicionProductoTab";
import NegociosTab from "../components/tabs/NegociosTab";

const Prices = () => {
    const [currentRowInPricesListTab, setCurrentRowInPricesListTab] = useState(0);
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("LISTA_PRECIOS");
    const setPresentaPreciosTabInPrincipalTabIsSelected = () => {};
    const setCondRolesTabInPrincipalTabIsSelected = () => {};
    const setCondProdServTabInPrincipalTabIsSelected = () => {};
    const setNegociosTabInPrincipalTabIsSelected = () => {};

    return (
        <Box>
            <PricesListNavTab
                setCurrentRowInPricesListTab={setCurrentRowInPricesListTab}
                setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
                setPresentaPreciosTabInPrincipalTabIsSelected={setPresentaPreciosTabInPrincipalTabIsSelected}
                setCondRolesTabInPrincipalTabIsSelected={setCondRolesTabInPrincipalTabIsSelected}
                setCondProdServTabInPrincipalTabIsSelected={setCondProdServTabInPrincipalTabIsSelected}
                setNegociosTabInPrincipalTabIsSelected={setNegociosTabInPrincipalTabIsSelected}
            />
            {currentTabInPrincipalTab === "LISTA_PRECIOS" && <PricesListTab />}
            {currentTabInPrincipalTab === "PRESENTACION_PRECIOS" && <PresentaPreciosTab />}
            {currentTabInPrincipalTab === "CONDICION_ROLES" && <CondRolesTab />}
            {currentTabInPrincipalTab === "CONDICION_PRODUCTO" && <CondProdServTab />}
            {currentTabInPrincipalTab === "NEGOCIOS" && <NegociosTab />}
        </Box>
    );
};

export default Prices;