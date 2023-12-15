import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    //DATA
    SelCondProCondicionData: null,
}

const CondProCondicionSlice = createSlice({
    name: 'CONDPROCONDICION',
    initialState,
    reducers: {
        SET_SELECTED_CONDPROCONDICION_DATA: (state, action) => {
            //console.log('<<REDUX-REDUCER>>:<<SET_SELECTED_CONDPROCONDICION_DATA>>', action.payload);
            state.SelCondProCondicionData = action.payload;
        },
    }
});

export const {
    SET_SELECTED_CONDPROCONDICION_DATA,
} = CondProCondicionSlice.actions;

export default CondProCondicionSlice.reducer;