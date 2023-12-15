import React, { useState } from 'react';
import { Box } from '@mui/material';
import CondicionProductoTable from "../tables/CondicionProductoTable";
import CondicionProductoNavTab from '../tabs/CondicionProductoNavTab';
import CondProCondicionTab from '../tabs/CondProCondicionTab';

export default function CondicionProductoTab() {
    const [currentRowInPricesListTab, setCurrentRowInPricesListTab] = useState(0);
    const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("COND_PRODUCTOS");
  
    return (
      <Box>
        <CondicionProductoNavTab
          setCurrentRowInPricesListTab={setCurrentRowInPricesListTab}
          setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
        />
        {currentTabInPrincipalTab === "COND_PRODUCTOS" && <CondicionProductoTable />}
            {currentTabInPrincipalTab === "COND_PROD_CONDICION" && <CondProCondicionTab />}
        </Box>
    );
};