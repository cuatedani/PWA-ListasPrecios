import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { Link, useHistory } from "react-router-dom";
const NegociosTabs = ["NEGOCIOS"];

const NegociosNavTab = ({
    CurrentRowInPricesListTab,
    setCurrentTabInPrincipalTab,
    setNegociosTabInPrincipalTabIsSelected,
}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e, newIndex) => {
        setCurrentTabIndex((prevIndex) => newIndex);
        console.log("entro al handleChange", e.target.innerText.toUpperCase());

        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());

        switch (e.target.innerText.toUpperCase()) {
            case "NEGOCIOS":
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
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {NegociosTabs.map((tab) => {
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
export default NegociosNavTab;