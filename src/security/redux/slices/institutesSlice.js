import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    institutesDataArr: [],
}
const institutesSlice = createSlice({
    name: 'INSTITUTES',
    initialState,
    reducers: {
        SET_DATA_INSTITUTES: (state, action) => {
            console.log('<<REDUX-REDUCER>>:<<SET_DATA_INSTITUTES>>', action.payload);
            state.institutesDataArr = action.payload
        }
    }
}
);
export const {
    SET_DATA_INSTITUTES,
} = institutesSlice.actions;
export default institutesSlice.reducer;