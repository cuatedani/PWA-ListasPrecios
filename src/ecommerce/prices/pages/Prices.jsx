import { Box } from "@mui/material";
import { useState } from "react";
import PricesListNavTab from "../components/tabs/PricesListNavTab";
import PricesListTab from "../components/tabs/PricesListTab";
import PresentaPreciosTab from "../components/tabs/PresentaPreciosTab";
import CondicionRolesTab from "../components/tabs/CondicionRolesTab";
import CondicionProductoTab from "../components/tabs/CondicionProductoTab";
import NegociosTab from "../components/tabs/NegociosTab";

const Prices = () => {
    const [CurrentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("LISTA_PRECIOS");
    const [PricesListTabInPricipalTabIsSelected, setPricesListTabInPricipalTabIsSelected] = useState(0);

    return (
        <Box>
            <PricesListNavTab
                setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
                setPricesListTabInPricipalTabIsSelected={setPricesListTabInPricipalTabIsSelected}
            />
            {CurrentTabInPrincipalTab === "LISTA_PRECIOS" && <PricesListTab />}
            {CurrentTabInPrincipalTab === "PRESENTACION_PRECIOS" && <PresentaPreciosTab />}
            {CurrentTabInPrincipalTab === "COND_ROLES" && <CondicionRolesTab />}
            {CurrentTabInPrincipalTab === "COND_PRODUCTO" && <CondicionProductoTab />}
            {CurrentTabInPrincipalTab === "NEGOCIOS" && <NegociosTab />}
        </Box>
    );
};

export default Prices;