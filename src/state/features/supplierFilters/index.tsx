import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropdownPayload {
    label: string;
    value: string[] | string;
}

interface InputPayload {
    label: string;
    value: string;
}

interface filterState {
    open: boolean;
    alias: string;
    origin: string[];
    tipo: string[];
    producto: string[];
    score: string[]
}

const initialState: filterState = {
    open: false,
    alias: "",
    origin: [],
    tipo: [],
    producto: [],
    score: []
};

const filterSlice = createSlice({
    name: "filtersSupplier",
    initialState,
    reducers: {
        toggleFilters(state) {
            state.open = !state.open;
        },
        handleSelectChange(state, action: PayloadAction<DropdownPayload>) {
            state[action.payload.label] = action.payload.value;
        },
        handleInputChange(state, action: PayloadAction<InputPayload>) {
            state[action.payload.label] = action.payload.value;
        },
        clearSelectFilter(state, action: PayloadAction<DropdownPayload>) {
            state[action.payload.label] = state[action.payload.label].filter(
                (state) => state !== action.payload.value
            );
        },
        clearInputFilter(state, action: PayloadAction<string>) {
            state[action.payload] = "";
        },
    },
});

export const {
    toggleFilters,
    handleSelectChange,
    handleInputChange,
    clearSelectFilter,
    clearInputFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
