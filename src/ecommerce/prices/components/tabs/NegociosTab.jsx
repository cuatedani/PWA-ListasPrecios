import React, { useState } from 'react';
import { Box } from '@mui/material';
import NegociosTable from "../tables/NegociosTable";
import NegociosNavTab from '../tabs/NegociosNavTab'

export default function NegociosTab() {
  const [CurrentRowInPricesListTab, setCurrentRowInPricesListTab] = useState(0);
  const [CurrentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("NEGOCIOS");
  const [NegociosTabInPrincipalTabIsSelected, setNegociosTabInPrincipalTabIsSelected] = useState(false);

  return (
    <Box>
      <NegociosNavTab
        CurrentRowInPricesListTab={setCurrentRowInPricesListTab}
        setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
        setNegociosTabInPrincipalTabIsSelected={setNegociosTabInPrincipalTabIsSelected}
      />
      {CurrentTabInPrincipalTab === "NEGOCIOS" && <NegociosTable />}
    </Box>
  );
};