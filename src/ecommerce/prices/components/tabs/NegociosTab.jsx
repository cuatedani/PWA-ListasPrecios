import React, { useState } from 'react';
import { Box } from '@mui/material';
import NegociosNavTab from "../tabs/NegociosNavTab";
import NegociosTable from "../tables/NegociosTable";

export default function NegociosTab() {
  const [CurrentTabInPricesListTab, setCurrentTabInPricesListTab] = useState("NEGOCIOS");
  const [CurrentNameTabInPricipalTabIsSelected, setCurrentNameTabInPricipalTabIsSelected] = useState(0);

  return (
    <Box>
      <NegociosNavTab
        setCurrentTabInPricesListTab={setCurrentTabInPricesListTab}
        setCurrentNameTabInPricipalTabIsSelected={setCurrentNameTabInPricipalTabIsSelected}
      />
      {CurrentTabInPricesListTab === "NEGOCIOS" && <NegociosTable />}
    </Box>
  );
};