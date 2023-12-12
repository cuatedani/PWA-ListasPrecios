import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/institutesSlice";
const store = configureStore({
    reducer: {
      institutesReducer: institutesSlice,
    },
  });
 
  export default store;