import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    //DATA
    SelCondicionRolesData: null,
}

const CondicionRolesSlice = createSlice({
    name: 'CONDICIONROLES',
    initialState,
    reducers: {
        SET_SELECTED_CONDICIONROLES_DATA: (state, action) => {
            //console.log('<<REDUX-REDUCER>>:<<SET_SELECTED_CONDICIONROLES_DATA>>', action.payload);
            state.SelCondicionRolesData = action.payload;
        },
    }
});

export const {
    SET_SELECTED_CONDICIONROLES_DATA,
} = CondicionRolesSlice.actions;

export default CondicionRolesSlice.reducer;