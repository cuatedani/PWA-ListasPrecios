import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const CondicionRolesTabs = [
    "COND_ROLES", 
    "COND_ROL_CONDICION"
];

const CondicionRolesNavTab = ({
    CurrentRowInCondicionRolesTab,
    CurrentTabInCondicionRolesTab,
    setCurrentNameTabInPrincipalTabIsSelected,
}) => {
    const [CurrentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);
        console.log("Entró al handleChange", e.target.innerText.toUpperCase());
        CurrentTabInCondicionRolesTab(e.target.innerText.toUpperCase());
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
                value={CurrentTabIndex}
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
                            disabled={CurrentRowInCondicionRolesTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default CondicionRolesNavTab;