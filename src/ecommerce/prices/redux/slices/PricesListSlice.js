import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    //DATA
    SelPriceListData: null,
}

const PricesListSlice = createSlice({
    name: 'PRICESLIST',
    initialState,
    reducers: {
        SET_SELECTED_PRICELIST_DATA: (state, action) => {
            state.SelPriceListData = action.payload;
        },
    }
});

export const {
    SET_SELECTED_PRICELIST_DATA,
} = PricesListSlice.actions;

export default PricesListSlice.reducer;