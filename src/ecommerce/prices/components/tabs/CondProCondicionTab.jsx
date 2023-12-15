import React, { useState } from 'react';
import { Box } from '@mui/material';
import CondProCondicionNavTab from "../tabs/CondProCondicionNavTab";
import CondProCondicionTable from "../tables/CondProCondicionTable";
import CondProConValoresTab from '../tabs/CondProConValoresTab';

export default function CondProCondicionTab() {
    const [CurrentTabInPricesListTab, setCurrentTabInPricesListTab] = useState("COND_PRODUCTO");
    const [CurrentNameTabInPricipalTabIsSelected, setCurrentNameTabInPricipalTabIsSelected] = useState(0);

    return (
        <Box>
            <CondProCondicionNavTab
                setCurrentTabInPricesListTab={setCurrentTabInPricesListTab}
                setCurrentNameTabInPricipalTabIsSelected={setCurrentNameTabInPricipalTabIsSelected}
            />
            {CurrentTabInPricesListTab === "COND_PROD_CONDICION" && <CondProCondicionTable />}
            {CurrentTabInPricesListTab === "COND_PROD_COND_VALORES" && <CondProConValoresTab />}
        </Box>
    );
};