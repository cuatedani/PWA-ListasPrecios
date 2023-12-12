import { Box } from "@mui/material";
import { useState } from "react";
import InstitutesNavTab from "../components/tabs/InstitutesNavTab";
import InstitutesTab from "../components/tables/InstitutesTable";
import BusinessTab from "../components/tabs/BusinessTab";  // Import BusinessTab

const Institutes = () => {
    const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(0);
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("INSTITUTOS");
    const setBusinessTabInPrincipalTabIsSelected = () => {};

    return (
        <Box>
            <InstitutesNavTab
                setCurrentRowInInstitutesTab={setCurrentRowInInstitutesTab}
                setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
                setBusinessTabInPrincipalTabIsSelected={setBusinessTabInPrincipalTabIsSelected}
            />
            {currentTabInPrincipalTab === "INSTITUTOS" && <InstitutesTab />}
            {currentTabInPrincipalTab === "NEGOCIOS" && <BusinessTab />}
        </Box>
    );
};

export default Institutes;
