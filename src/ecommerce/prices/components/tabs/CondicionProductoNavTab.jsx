import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const CondicionProductoTabs = [
    "COND_PRODUCTOS",
    "COND_PROD_CONDICION"
];

const CondicionProductoNavTab = ({
    CurrentRowInCondicionProductoTab,
    CurrentTabInCondicionProductoTab,
    setCurrentNameTabInPrincipalTabIsSelected,
}) => {
    const [CurrentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);
        console.log("Entró al handleChange", e.target.innerText.toUpperCase());
        CurrentTabInCondicionProductoTab(e.target.innerText.toUpperCase());
        switch (e.target.innerText.toUpperCase()) {
            case "COND_PRODUCTO":
                setCurrentTabIndex(0);
                break;
            case "COND_PROD_CONDICION":
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
                {CondicionProductoTabs.map((tab) => {
                    return (
                        <Tab
                            key={tab}
                            label={tab}
                            disabled={CurrentRowInCondicionProductoTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default CondicionProductoNavTab;