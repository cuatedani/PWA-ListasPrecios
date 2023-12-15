import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
const CondicionRolesTabs = ["COND_ROLES", "COND_ROL_CONDICION"];

const CondicionRolesNavTab = ({
    CurrentRowInPricesListTab,
    setCurrentTabInPrincipalTab,
    setCondicionRolesTabInPrincipalTabIsSelected,
}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);

        console.log("entro al handleChange", e.target.innerText.toUpperCase());
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
        setCondicionRolesTabInPrincipalTabIsSelected(false);

        switch (e.target.innerText.toUpperCase()) {
            case "COND_ROLES":
                setCurrentTabIndex(0);
                break;
            case "COND_ROL_CONDICION":
                setCurrentTabIndex(1);
                break;
        }
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {CondicionRolesTabs.map((tab) => {
                    return (
                        <Tab
                            key={tab}
                            label={tab}
                            disabled={CurrentRowInPricesListTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default CondicionRolesNavTab;