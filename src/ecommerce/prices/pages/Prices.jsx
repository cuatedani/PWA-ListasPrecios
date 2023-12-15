import { Box } from "@mui/material";
import { useState } from "react";
import PricesListNavTab from "../components/tabs/PricesListNavTab";
import PricesListTab from "../components/tabs/PricesListTab";
import PresentaPreciosTab from "../components/tabs/PresentaPreciosTab";
import CondicionRolesTab from "../components/tabs/CondicionRolesTab";
import CondicionProductoTab from "../components/tabs/CondicionProductoTab";
import NegociosTab from "../components/tabs/NegociosTab";
import { Print } from "@mui/icons-material";

const Prices = () => {
    const [CurrentRowInPricesListTab, setCurrentRowInPricesListTab] = useState(0);
    const [CurrentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("LISTA_PRECIOS");
    const [PricesListTabInPrincipalTabIsSelected, setPricesListTabInPrincipalTabIsSelected] = useState(false);

    return (
        <Box>
            <PricesListNavTab
                setCurrentRowInPricesListTab={CurrentRowInPricesListTab}
                setCurrentTabInPrincipalTab={CurrentTabInPrincipalTab}
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