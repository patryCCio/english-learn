import { configureStore } from "@reduxjs/toolkit";
import allTestsReducer from "./callsSlice";

export default configureStore({
    reducer: {
        allTests: allTestsReducer,
    }
})