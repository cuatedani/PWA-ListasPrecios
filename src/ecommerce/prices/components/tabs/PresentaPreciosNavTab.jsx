import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const PresentaPreciosTabs = [
    "PRESENTACION_PRECIOS"
];

const PresentaPreciosNavTab = ({
    CurrentRowInPricesListTab,
    setCurrentTabInPrincipalTab,
    setCurrentNameTabInPrincipalTabIsSelected,
}) => {
    const [CurrentTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);
        console.log("Entró al handleChange", e.target.innerText.toUpperCase());
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
        switch (e.target.innerText.toUpperCase()) {
            case "PRESENTACION_PRECIOS":
                setCurrentTabIndex(0);
                break;
        }
    };

    return (
        <Box
            sx={{
                border: (theme) => `2px solid ${theme.palette.divider}`,
                mx: 1,
                padding: 0.5
            }}
        >
            <Tabs
                value={CurrentTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {PresentaPreciosTabs.map((tab) => {
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
export default PresentaPreciosNavTab;