import React, { useState } from 'react';
import { Box } from '@mui/material';
import CondicionRolesTable from "../tables/CondicionRolesTable";
import CondicionRolesNavTab from '../tabs/CondicionRolesNavTab';
import CondRolCondicionTab from '../tabs/CondRolCondicionTab';

export default function CondicionRolesTab() {
  const [CurrentTabInPricesListTab, setCurrentTabInPricesListTab] = useState("COND_ROLES");
  const [CurrentTabInCondicionRolesTab, setCurrentTabInCondicionRolesTab] = useState("COND_ROLES");
  const [CurrentNameTabInPricipalTabIsSelected, setCurrentNameTabInPricipalTabIsSelected] = useState(0);

  return (
    <Box>
      <CondicionRolesNavTab
        CurrentTabInCondicionRolesTab={setCurrentTabInCondicionRolesTab}
        setCurrentNameTabInPricipalTabIsSelected={setCurrentNameTabInPricipalTabIsSelected}
      />
      {CurrentTabInCondicionRolesTab === "COND_ROLES" && <CondicionRolesTable />}
      {CurrentTabInCondicionRolesTab === "COND_ROL_CONDICION" && <CondRolCondicionTab />}
    </Box>
  );
};