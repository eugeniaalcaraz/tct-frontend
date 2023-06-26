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
    temporada: string[];
    proveedor: string[];
    departamento: string[];
    tipologia: string[];
    calidad: string[];
    estado: string[];
    diseñador: string[];
    origen: string[];
    destino: string[];
    embarque: string[];
    unidad: string[];
    marca: string[];
    rubro: string[];
    concepto: string[];
    linea: string[];
    fit: string[];
    fecha: string;
    nombre: string;
    cantidad: string;
    costo: string;
    peso: string;
}

const initialState: filterState = {
    open: false,
    temporada: [],
    proveedor: [],
    departamento: [],
    tipologia: [],
    calidad: [],
    estado: [],
    diseñador: [],
    origen: [],
    destino: [],
    embarque: [],
    marca: [],
    unidad: [],
    rubro: [],
    concepto: [],
    linea: [],
    fit: [],
    fecha: "",
    nombre: "",
    cantidad: "",
    costo: "",
    peso: "",
};

const filterSlice = createSlice({
    name: "filters",
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
