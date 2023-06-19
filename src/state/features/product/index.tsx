import {
    Fabric,
    OptionsType,
    Designers,
    OptionsTypeName,
    Suppliers,
    Product,
    AllSeasons,
    FabricCombo,
    Brands,
    ColorsStateType,
    Avios,
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
    colors: ColorsStateType[] | null;
    trims: OptionsType[] | null;
    countries: OptionsTypeName[] | null;
    supplier: Suppliers[] | null;
    typeOfshipment: OptionsType[] | null;
    telas: FabricCombo[];
    brands: Brands[];
    concepts: OptionsType[];
    lines: OptionsType[];
    rises: OptionsType[];
    bodyFit: OptionsType[];
    status: { IdStatus: number; Description: string }[];
    allSeasons: AllSeasons[] | null;
    avios: Avios[];
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
    telas: [],
    status: [],
    allSeasons: null,
    brands: [],
    concepts: [],
    lines: [],
    rises: [],
    bodyFit: [],
    avios: [],
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
        addTela(
            state,
            action: PayloadAction<{ fabricNumber: number; tela: FabricCombo }>
        ) {
            state.telas[action.payload.fabricNumber] = action.payload.tela;
        },
        addTelasArray(state, action: PayloadAction<FabricCombo[]>) {
            state.telas = action.payload;
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
            state.telas = [];
        },
        handleTrimCombos(
            state,
            action: PayloadAction<{
                trimComboNumber: number;
                trimCombo: Avios;
            }>
        ) {
            state.avios[action.payload.trimComboNumber] =
                action.payload.trimCombo;
        },
        clearTrimCombos(state) {
            // state.trimCombos1 = [];
            // state.trimCombos2 = [];
            // state.trimCombos3 = [];
            // state.trimCombos4 = [];
            // state.trimCombos5 = [];
            // state.trimCombos6 = [];
            // state.trimCombos7 = [];
            // state.trimCombos8 = [];
            // state.trimCombos9 = [];
            // state.trimCombos10 = [];
            // state.trimCombos11 = [];
            // state.trimCombos12 = [];
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
    addTela,
    clearCombos,
    handleTrimCombos,
    clearTrimCombos,
    setErrors,
    removeCombo,
    addTelasArray,
} = productSlice.actions;
export default productSlice.reducer;
