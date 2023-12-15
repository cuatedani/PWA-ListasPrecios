import React, { useState } from 'react';
import { Box } from '@mui/material';
import CondicionRolesTable from "../tables/CondicionRolesTable";
import CondicionRolesNavTab from '../tabs/CondicionRolesNavTab';
//import CondRolCondicionTab from '../tabs/CondRolCondicionTab';
//{CurrentTabInPrincipalTab === "COND_ROL_CONDICION" && <CondRolCondicionTab />}

export default function CondicionRolesTab() {
  const [CurrentRowInPricesListTab, setCurrentRowInPricesListTab] = useState(0);
  const [CurrentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("COND_ROLES");
  const [CondicionRolesTabInPrincipalTabIsSelected, setCondicionRolesTabInPrincipalTabIsSelected] = useState(false);
  console.log(CurrentTabInPrincipalTab);
  return (
    <Box>
      <CondicionRolesNavTab
        CurrentRowInPricesListTab={setCurrentRowInPricesListTab}
        setCurrentTabInPrincipalTab={setCurrentTabInPrincipalTab}
        setCondicionRolesTabInPrincipalTabIsSelected={setCondicionRolesTabInPrincipalTabIsSelected}
      />
      {CurrentTabInPrincipalTab === "COND_ROLES" && <CondicionRolesTable />}
    </Box>
  );
};