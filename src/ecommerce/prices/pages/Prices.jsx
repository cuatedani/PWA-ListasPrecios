import { Box } from "@mui/material";
import { useState } from "react";
import PricesListTab from "../components/tabs/PricesListTab";
import PricesListNavTab from "../components/tabs/PricesListNavTab";
// import PresentaPreciosTab from "../components/tabs/PresentaPreciosTab";
// import CondRolesTab from "../components/tabs/CondicionRolesTab";
// import CondProdServTab from "../components/tabs/CondicionProductoTab";
// import NegociosTab from "../components/tabs/NegociosTab";

const Prices = () => {
    const [currentRowInPricesListTab, setCurrentRowInPricesListTab] = useState(0);
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("LISTASPRECIOS");
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
            {currentTabInPrincipalTab === "LISTASPRECIOS" && <PricesListTab />}
            {/* {currentTabInPrincipalTab === "PRESENTACION PRECIOS" && <PresentaPreciosTab />}
            {currentTabInPrincipalTab === "CONDICION ROLES" && <CondRolesTab />}
            {currentTabInPrincipalTab === "CONDICION PRODUCTOS" && <CondProdServTab />}
            {currentTabInPrincipalTab === "NEGOCIOS" && <NegociosTab />} */}
        </Box>
    );
};

export default Prices;