import React, { useState } from 'react';
import { Box } from '@mui/material';
import CondProConValoresNavTab from "../tabs/CondProConValoresNavTab";
import CondProConValoresTable from "../tables/CondProConValoresTable";

export default function CondProConValoresTab() {
    const [CurrentTabInPricesListTab, setCurrentTabInPricesListTab] = useState("COND_PROD_COND_VALORES");
    const [CurrentNameTabInPricipalTabIsSelected, setCurrentNameTabInPricipalTabIsSelected] = useState(0);

    return (
        <Box>
            <CondProConValoresNavTab
                CurrentTabInPricesListTab={setCurrentTabInPricesListTab}
                setCurrentNameTabInPricipalTabIsSelected={setCurrentNameTabInPricipalTabIsSelected}
            />
            {CurrentTabInPricesListTab === "COND_PROD_COND_VALORES" && <CondProConValoresTable />}
        </Box>
    );
};