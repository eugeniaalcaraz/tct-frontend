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
import { comboChooser } from "./aux/auxFuncion";

export interface productState {
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
    combos1: {
        fabric: string;
        colorAmount: number | undefined;
        name: string;
        uuid: string;
    }[];
    combos2: {
        fabric: string;
        colorAmount: number | undefined;
        name: string;
        uuid: string;
    }[];
    combos3: {
        fabric: string;
        colorAmount: number | undefined;
        name: string;
        uuid: string;
    }[];
    combos4: {
        fabric: string;
        colorAmount: number | undefined;
        name: string;
        uuid: string;
    }[];
    combos5: {
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
    combos1: [],
    combos2: [],
    combos3: [],
    combos4: [],
    combos5: [],
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
                comboNumber: number;
                combo: {
                    fabric: string;
                    colorAmount: number | undefined;
                    name: string;
                    uuid: string;
                };
            }>
        ) {
            const selectedComboNumber = action.payload.comboNumber;
            state[comboChooser(selectedComboNumber)] = [
                ...state[comboChooser(selectedComboNumber)],
                action.payload.combo,
            ];
        },
        removeCombo(
            state,
            action: PayloadAction<{ comboNumber: number; uuid: string }>
        ) {
            const selectedComboNumber = action.payload.comboNumber;

            const index = state[comboChooser(selectedComboNumber)].findIndex(
                (combo) => combo.uuid === action.payload.uuid
            );
            state[comboChooser(selectedComboNumber)].splice(index, 1);
        },
        clearCombos(state) {
            state.combos1 = [];
            state.combos2 = [];
            state.combos3 = [];
            state.combos4 = [];
            state.combos5 = [];
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
