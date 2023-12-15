import React, { useState } from 'react';
import { Box } from '@mui/material';
import CondRolCondicionNavTab from "../tabs/CondRolCondicionNavTab";
import CondRolCondicionTable from "../tables/CondRolCondicionTable";

export default function CondRolCondicionTab() {
    const [CurrentTabInPricesListTab, setCurrentTabInPricesListTab] = useState("COND_ROL_CONDICION");
    const [CurrentNameTabInPricipalTabIsSelected, setCurrentNameTabInPricipalTabIsSelected] = useState(0);

    return (
        <Box>
            <CondRolCondicionNavTab
                CurrentTabInPricesListTab={setCurrentTabInPricesListTab}
                setCurrentNameTabInPricipalTabIsSelected={setCurrentNameTabInPricipalTabIsSelected}
            />
            {CurrentTabInPricesListTab === "COND_ROL_CONDICION" && <CondRolCondicionTable />}
        </Box>
    );
};