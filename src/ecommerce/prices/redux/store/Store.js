import { configureStore } from "@reduxjs/toolkit";
import PricesListSlice from "../slices/PricesListSlice";

const Store = configureStore({
    reducer: {
        PricesListReducer: PricesListSlice,
    },
});

export default Store;
