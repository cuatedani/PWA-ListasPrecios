import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    //DATA
    SelCondicionProductoData: null,
}

const CondicionProductoSlice = createSlice({
    name: 'CONDICIONPRODUCTO',
    initialState,
    reducers: {
        SET_SELECTED_CONDICIONPRODUCTO_DATA: (state, action) => {
            //console.log('<<REDUX-REDUCER>>:<<SET_SELECTED_CONDICIONPRODUCTO_DATA>>', action.payload);
            state.SelCondicionProductoData = action.payload;
        },
    }
});

export const {
    SET_SELECTED_CONDICIONPRODUCTO_DATA,
} = CondicionProductoSlice.actions;

export default CondicionProductoSlice.reducer;