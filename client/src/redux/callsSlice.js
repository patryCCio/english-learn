import { createSlice } from "@reduxjs/toolkit";

export const callsSlice = createSlice({
    name: "data",
    initialState: {
        dataInfo: [],
        dataTeach: [],
        pending: false,
        success: false,
        error: false,
    },

    reducers: {
        getStart: (state) => {
            state.pending = true;
        },

        getSuccess: (state, action) => {
            state.pending = false;
            state.dataInfo = action.payload.names;
            state.success = true;
        },

        getError: (state) => {
            state.error = true;
            state.pending = false;
            state.success = false;
        },

        setDataInfo: (state, action) => {
            state.dataInfo = action.payload;
        },

        addDataTeach: (state, action) => {
            action.payload.forEach(el => {
                state.dataTeach.push(el);
            })
        },

        deleteDataTeach: (state, action) => {
            state.dataTeach = action.payload;
        },

        deleteDataInfo: (state, action) => {
            state.dataInfo = action.payload;
        }
    }
})

export const { getStart, getSuccess, getError, deleteDataTeach, addDataTeach, deleteDataInfo, setDataInfo } = callsSlice.actions;
export default callsSlice.reducer;