import {
    Fabric,
    OptionsType,
    Designers,
    OptionsTypeName,
    Suppliers,
    Product,
    AllSeasons,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productState {
    errors: unknown;
    product: Product[] | null;
    filteredData: Product[] | null;
    seasons: OptionsTypeName[] | null;
    tipology: OptionsType[] | null;
    managementUnit: OptionsType[] | null;
    designers: Designers[] | null;
    fabrics: Fabric[] | null;
    composition: OptionsType[] | null;
    localization: OptionsType[] | null;
    colors: OptionsType[] | null;
    trims: OptionsType[] | null;
    countries: OptionsTypeName[] | null;
    supplier: Suppliers[] | null;
    typeOfshipment: OptionsType[] | null;
    combos: {
        fabric: string;
        colorAmount: number | undefined;
        name: string;
        uuid: string;
    }[];
    trimCombos: { idTrimColor: string }[];
    status: { IdStatus: number; Description: string }[];
    allSeasons: AllSeasons[] | null;
}

const initialState: productState = {
    errors: null,
    product: null,
    filteredData: null,
    seasons: null,
    tipology: null,
    managementUnit: null,
    designers: null,
    fabrics: null,
    composition: null,
    localization: null,
    colors: null,
    trims: null,
    countries: null,
    supplier: null,
    typeOfshipment: null,
    combos: [],
    trimCombos: [],
    status: [],
    allSeasons: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setData(state, action: PayloadAction<Product[]>) {
            state.product = action.payload;
        },
        setFilterData(state, action: PayloadAction<Product[]>) {
            state.filteredData = action.payload;
        },
        handleProductData(state, action: PayloadAction<Partial<productState>>) {
            return { ...state, ...action.payload };
        },
        handleCombos(
            state,
            action: PayloadAction<{
                fabric: string;
                colorAmount: number | undefined;
                name: string;
                uuid: string;
            }>
        ) {
            state.combos = [...state.combos, action.payload];
        },
        removeCombo(state, action: PayloadAction<string>) {
            const index = state.combos.findIndex(
                (combo) => combo.uuid === action.payload
            );
            state.combos.splice(index, 1);
        },
        clearCombos(state) {
            state.combos = [];
        },
        handleTrimCombos(
            state,
            action: PayloadAction<{ idTrimColor: string }>
        ) {
            state.trimCombos = [...state.trimCombos, action.payload];
        },
        clearTrimCombos(state) {
            state.trimCombos = [];
        },
        setErrors(state, action: PayloadAction<unknown>) {
            state.errors = action.payload;
        },
    },
});

export const {
    setData,
    setFilterData,
    handleProductData,
    handleCombos,
    clearCombos,
    handleTrimCombos,
    clearTrimCombos,
    setErrors,
    removeCombo,
} = productSlice.actions;
export default productSlice.reducer;
