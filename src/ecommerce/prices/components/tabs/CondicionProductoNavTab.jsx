import { Box, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
//import { Link, useHistory } from "react-router-dom";
const CondicionProductoTabs = ["COND_PRODUCTOS", "COND_PROD_CONDICION"];

const CondicionProductoNavTab = ({
    currentRowInCondicionProductoTab,
    setCurrentTabInPrincipalTab,
    setCondicionProductoTabInPrincipalTabIsSelected,
}) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        console.log("entro al handleChange", e.target.innerText.toUpperCase());
        setCurrentTabInPrincipalTab(e.target.innerText.toUpperCase());
        setCondicionProductoTabInPrincipalTabIsSelected(false);

        switch (e.target.innerText.toUpperCase()) {
            case "COND_PRODUCTOS":
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
                value={currenTabIndex}
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
                            disabled={currentRowInCondicionProductoTab === null}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};
export default CondicionProductoNavTab;