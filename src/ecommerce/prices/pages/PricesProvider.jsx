import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllPricesList } from "../services/remote/get/getAllPricesList";
import { getOnePriceList } from "../services/remote/get/getOnePriceList";
//import { TOAST_EXITO } from "../../../components/elements/messages/MySwalAlerts";
// Crear un contexto para compartir datos y funciones, y un componente que contendrá todos los estados y funciones
const PricesListContext = createContext();
export const PricesListProvider = ({ children }) => {
    const [PricesList, setPricesList] = useState([]);
    const [SelPriceList, setSelPriceList] = useState(null);
    const [loadingTable, setLoadingTable] = useState(false);
    const [SelectedRowId, setSelectedRowId] = useState(null);

    useEffect(() => {
        fetchDataPricesList();
    }, []);

    const fetchDataPricesList = async (id) => {
        setLoadingTable(true);

        try {
            setPricesList(await getAllPricesList());
        } catch (error) {
            console.error(`Error al Obtener las Listas de Precios`, error);
        }
        setLoadingTable(false);
    };

    const fetchDataPricesListSelect = async (id) => {
        setLoadingTable(true);
        try {
            setSelPriceList(await getOnePriceList(id));
        } catch (error) {
            console.error(`Error al Obtener la Lista:${id}`, error);
        }
        setLoadingTable(false);
    };

    // Pasar los datos y funciones a través del contexto
    const contextValue = {
        PricesList,
        SelPriceList,
        loadingTable,
        SelectedRowId,
        setSelPriceList,
        fetchDataPricesList,
        fetchDataPricesListSelect,
        setSelectedRowId,
    };
    return (
        <PricesListContext.Provider value={contextValue}>
            {children} <ToastContainer />
        </PricesListContext.Provider>
    );
};
// Crear un hook personalizado para acceder al contexto
export const usePricesListContext = () => useContext(PricesListContext);