import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const CondProCondicionTabs = [
    "COND_PROD_CONDICION", 
    "COND_PROD_COND_VALORES"
];

const CondProCondicionNavTab = ({
    CurrentRowInCondProCondicionTab,
    CurrentTabInCondProCondicionTab,
}) => {
    const [CurrentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);
        console.log("Entró al handleChange", e.target.innerText.toUpperCase());
        CurrentTabInCondProCondicionTab(e.target.innerText.toUpperCase());
        switch (e.target.innerText.toUpperCase()) {
            case "COND_PROD_CONDICION":
                setCurrentTabIndex(0);
                break;
            case "COND_PROD_COND_VALORES":
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
                {CondProCondicionTabs.map((tab) => {
                    return (
                        <Tab
                            key={tab}
                            label={tab}
                            disabled={CurrentRowInCondProCondicionTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default CondProCondicionNavTab;