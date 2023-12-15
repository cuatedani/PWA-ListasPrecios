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
            //console.log('<<REDUX-REDUCER>>:<<SET_SELECTED_PRICELIST_DATA>>', action.payload);
            state.SelPriceListData = action.payload;
        },
    }
});

export const {
    SET_SELECTED_PRICELIST_DATA,
} = PricesListSlice.actions;

export default PricesListSlice.reducer;