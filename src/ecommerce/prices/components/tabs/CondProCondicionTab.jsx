import React, { useState } from 'react';
import { Box } from '@mui/material';
import CondProCondicionNavTab from "../tabs/CondProCondicionNavTab";
import CondProCondicionTable from "../tables/CondProCondicionTable";
import CondProConValoresTab from '../tabs/CondProConValoresTab';

export default function CondProCondicionTab() {
    const [CurrentTabInCondProCondicionTab, setCurrentTabInCondProCondicionTab] = useState("COND_PROD_CONDICION");
    const [CurrentNameTabInPricipalTabIsSelected, setCurrentNameTabInPricipalTabIsSelected] = useState(0);

    return (
        <Box>
            <CondProCondicionNavTab
                CurrentTabInCondProCondicionTab={setCurrentTabInCondProCondicionTab}
                setCurrentNameTabInPricipalTabIsSelected={setCurrentNameTabInPricipalTabIsSelected}
            />
            {CurrentTabInCondProCondicionTab === "COND_PROD_CONDICION" && <CondProCondicionTable />}
            {CurrentTabInCondProCondicionTab === "COND_PROD_COND_VALORES" && <CondProConValoresTab />}
        </Box>
    );
};