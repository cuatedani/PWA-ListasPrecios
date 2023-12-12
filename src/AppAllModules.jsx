import { RouterProvider } from "react-router-dom";
import RouterEducation from "./navigation/NaviRoutesEducation";
import RouterSecurity from "./navigation/NaviRoutesSecurity";
import RouterCommerce from "./navigation/NaviRoutesCommerce";
import Footer from "./share/footer/components/Footer";
import { GET_DATA_START } from "./security/redux/thunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function AppAllModules() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GET_DATA_START()).then(() => {
            console.log("<<END-DISPATCH>>: GET_DATA_START se ejecuto de forma correcta");
        });
    }, []);
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div id='div-app'>
                    <RouterProvider router={RouterCommerce} />
                    <div id='div-footer'>
                        <Footer />
                    </div>
                </div>
            </LocalizationProvider>
        </>
    );
}