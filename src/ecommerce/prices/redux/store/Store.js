import { configureStore } from "@reduxjs/toolkit";
import PricesListSlice from "../slices/PricesListSlice";
import CondicionRolesSlice from "../slices/CondicionRolesSlice";
import CondicionProductoSlice from "../slices/CondicionProductoSlice";
import CondProCondicionSlice from "../slices/CondProCondicionSlice";

const Store = configureStore({
    reducer: {
        PricesListReducer: PricesListSlice,
        CondicionRolesReducer: CondicionRolesSlice,
        CondicionProductoReducer: CondicionProductoSlice,
        CondProCondicionReducer: CondProCondicionSlice,
    },
});

export default Store;
