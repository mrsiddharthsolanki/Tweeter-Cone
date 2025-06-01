import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkmode: false,
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkmode = !state.darkmode;
        },

        setTheme : (state, action) => {
            state.darkmode = action.payload;
        }
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;