import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    isLoading: false,
    toastMessage: "",
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },

        closeModal: (state) => {
            state.isModalOpen = false;
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setToast: (state, action) => {
            state.toastMessage = action.payload;
        },

        clearToast: (state) => {
            state.toastMessage = "";
        },
    },
});

export const { openModal, closeModal, setLoading, setToast, clearToast } = uiSlice.actions;

export default uiSlice.reducer;