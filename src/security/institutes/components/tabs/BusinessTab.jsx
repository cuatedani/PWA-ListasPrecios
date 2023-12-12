import { Box } from "@mui/material";
import { useState } from "react";
import BusinessNavTab from "./BusinessNavTab";
import InfoAdTab from "./InfoAdTab";
import FilesTab from "./FilesTab";
import PhonsTab from "./PhonsTab";
import AddressesTab from "./AddressesTab";
import WebAddressesTab from "./WebAddressesTab";

export default function BusinessTab() {

    const [currentRowInBusinessTab, setCurrentRowInBusinessTab] = useState(1);

    const [currentNameTabInBusinessTab, setCurrentNameTabInBusinessTab] = useState("NEGOCIOS");

    return (
        <Box>
            <BusinessNavTab
                currentRowInBusinessTab={currentRowInBusinessTab}
                setCurrentNameTabInBusinessTab={setCurrentNameTabInBusinessTab}
            />

            {console.log(currentNameTabInBusinessTab)}

            {currentNameTabInBusinessTab == "INFO ADICIONAL" && <InfoAdTab />}
            {currentNameTabInBusinessTab == "ARCHIVOS" && <FilesTab />}
            {currentNameTabInBusinessTab == "TELEFONOS" && <PhonsTab />}
            {currentNameTabInBusinessTab == "DIR WEBS" && <WebAddressesTab />}
            {currentNameTabInBusinessTab == "DOMICILIOS" && <AddressesTab />}

        </Box>
    );
}