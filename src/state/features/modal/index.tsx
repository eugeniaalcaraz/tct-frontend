import { ModalTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    modalOpen: boolean;
    modalType: ModalTypes | null;
}

const initialState: ModalState = {
    modalOpen: false,
    modalType: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        handleModalData(state, action: PayloadAction<Partial<ModalState>>) {
            return { ...state, ...action.payload };
        },
    },
});

export const { handleModalData } = modalSlice.actions;
export default modalSlice.reducer;
