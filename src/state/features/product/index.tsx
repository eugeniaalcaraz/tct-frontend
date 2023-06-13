import {
    Fabric,
    OptionsType,
    Designers,
    OptionsTypeName,
    Suppliers,
    Product,
    AllSeasons,
    FabricCombo,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fabricCombos, trimsCombos } from "./aux/auxFuncion";

// tipo viejo de combos
// fabric: string;
//         // colorAmount: number | undefined;
//         // name: string;
//         // uuid: string;

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
    combos: FabricCombo[];
    // combos2: {
    //     fabric: string;
    //     colorAmount: number | undefined;
    //     name: string;
    //     uuid: string;
    // }[];
    // combos3: {
    //     fabric: string;
    //     colorAmount: number | undefined;
    //     name: string;
    //     uuid: string;
    // }[];
    // combos4: {
    //     fabric: string;
    //     colorAmount: number | undefined;
    //     name: string;
    //     uuid: string;
    // }[];
    // combos5: {
    //     fabric: string;
    //     colorAmount: number | undefined;
    //     name: string;
    //     uuid: string;
    // }[];
    trimCombos1: { idTrimColor: string }[];
    trimCombos2: { idTrimColor: string }[];
    trimCombos3: { idTrimColor: string }[];
    trimCombos4: { idTrimColor: string }[];
    trimCombos5: { idTrimColor: string }[];
    trimCombos6: { idTrimColor: string }[];
    trimCombos7: { idTrimColor: string }[];
    trimCombos8: { idTrimColor: string }[];
    trimCombos9: { idTrimColor: string }[];
    trimCombos10: { idTrimColor: string }[];
    trimCombos11: { idTrimColor: string }[];
    trimCombos12: { idTrimColor: string }[];
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
    // combos2: [],
    // combos3: [],
    // combos4: [],
    // combos5: [],
    trimCombos1: [],
    trimCombos2: [],
    trimCombos3: [],
    trimCombos4: [],
    trimCombos5: [],
    trimCombos6: [],
    trimCombos7: [],
    trimCombos8: [],
    trimCombos9: [],
    trimCombos10: [],
    trimCombos11: [],
    trimCombos12: [],
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
            state[fabricCombos[selectedComboNumber]] = [
                ...state[fabricCombos[selectedComboNumber]],
                action.payload.combo,
            ];
        },
        removeCombo(
            state,
            action: PayloadAction<{ comboNumber: number; uuid: string }>
        ) {
            const selectedComboNumber = action.payload.comboNumber;

            const index = state[fabricCombos[selectedComboNumber]].findIndex(
                (combo) => combo.uuid === action.payload.uuid
            );
            state[fabricCombos[selectedComboNumber]].splice(index, 1);
        },
        clearCombos(state) {
            state.combos = [];
            // state.combos2 = [];
            // state.combos3 = [];
            // state.combos4 = [];
            // state.combos5 = [];
        },
        handleTrimCombos(
            state,
            action: PayloadAction<{
                trimComboNumber: number;
                trimCombo: { idTrimColor: string };
            }>
        ) {
            state[trimsCombos[action.payload.trimComboNumber]] = [
                ...state[trimsCombos[action.payload.trimComboNumber]],
                action.payload.trimComboNumber,
            ];
        },
        clearTrimCombos(state) {
            state.trimCombos1 = [];
            state.trimCombos2 = [];
            state.trimCombos3 = [];
            state.trimCombos4 = [];
            state.trimCombos5 = [];
            state.trimCombos6 = [];
            state.trimCombos7 = [];
            state.trimCombos8 = [];
            state.trimCombos9 = [];
            state.trimCombos10 = [];
            state.trimCombos11 = [];
            state.trimCombos12 = [];
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
