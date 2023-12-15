import React, { useState } from 'react';
import { Box } from '@mui/material';
import PresentaPreciosTable from "../tables/PresentaPreciosTable";
import PresentaPreciosNavTab from '../tabs/PresentaPreciosNavTab';

export default function PresentaPreciosTab() {
  const [CurrentRowInPricesListTab, setCurrentRowInPricesListTab] = useState(0);
  const [CurrentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("PRESENTACION_PRECIOS");

  return (
    <Box>
      <PresentaPreciosNavTab
        setCurrentRowInPricesListTab={CurrentRowInPricesListTab}
        setCurrentTabInPrincipalTab={CurrentTabInPrincipalTab}
      />
      {CurrentTabInPrincipalTab === "PRESENTACION_PRECIOS" && <PresentaPreciosTable />}
    </Box>
  );
};