import React, { useState } from 'react';
import { Box } from '@mui/material';
import PresentaPreciosTable from "../tables/PresentaPreciosTable";
import PresentaPreciosNavTab from '../tabs/PresentaPreciosNavTab';

export default function PresentaPreciosTab() {
  const [CurrentTabInPricesListTab, setCurrentTabInPricesListTab] = useState("PRESENTACION_PRECIOS");
  const [CurrentNameTabInPricipalTabIsSelected, setCurrentNameTabInPricipalTabIsSelected] = useState(0);

  return (
    <Box>
      <PresentaPreciosNavTab
        setCurrentTabInPricesListTab={setCurrentTabInPricesListTab}
        setCurrentNameTabInPricipalTabIsSelected={setCurrentNameTabInPricipalTabIsSelected}
      />
      {CurrentTabInPricesListTab === "PRESENTACION_PRECIOS" && <PresentaPreciosTable />}
    </Box>
  );
};