import React, { useState } from 'react';
import { Box } from '@mui/material';
import CondicionProductoNavTab from "../tabs/CondicionProductoNavTab";
import CondicionProductoTable from "../tables/CondicionProductoTable";
import CondProCondicionTab from '../tabs/CondProCondicionTab';

export default function CondicionProductoTab() {
  const [CurrentTabInPricesListTab, setCurrentTabInPricesListTab] = useState("COND_PRODUCTO");
  const [CurrentTabInCondicionProductoTab, setCurrentTabInCondicionProductoTab] = useState("COND_PRODUCTO");
  const [CurrentNameTabInPricipalTabIsSelected, setCurrentNameTabInPricipalTabIsSelected] = useState(0);

  return (
    <Box>
      <CondicionProductoNavTab
        setCurrentTabInCondicionProductoTab={setCurrentTabInCondicionProductoTab}
        setCurrentNameTabInPricipalTabIsSelected={setCurrentNameTabInPricipalTabIsSelected}
      />
      {CurrentTabInCondicionProductoTab === "COND_PRODUCTO" && <CondicionProductoTable />}
      {CurrentTabInCondicionProductoTab === "COND_PROD_CONDICION" && <CondProCondicionTab />}
    </Box>
  );
};