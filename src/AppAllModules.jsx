import { RouterProvider } from "react-router-dom";
import RouterEducation from "./navigation/NaviRoutesEducation";
import RouterCommerce from "./navigation/NaviRoutesCommerce";
import Footer from "./share/footer/components/Footer";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Provider } from "react-redux";
import store from './ecommerce/prices/redux/store/Store';

export default function AppAllModules() {
    return (
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div id='div-app'>
                    <RouterProvider router={RouterCommerce} />
                    <div id='div-footer'>
                        <Footer />
                    </div>
                </div>
            </LocalizationProvider>
        </Provider>
    );
}