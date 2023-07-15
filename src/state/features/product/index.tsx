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
    TipologyOptions,
    UpdateProduct,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fabricCombos } from "./aux/auxFuncion";

// tipo viejo de combos
// fabric: string;
//         // colorAmount: number | undefined;
//         // name: string;
//         // uuid: string;

export interface productState {
    mutationSuccess: boolean;
    errors: unknown;
    reduxErrors: object;
    specialSizeCurve: boolean;
    product: Product[] | null;
    filteredData: Product[] | null;
    seasons: OptionsTypeName[] | null;
    tipology: TipologyOptions[] | null;
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
    edition: boolean;
    industries: OptionsType[];
    updateProduct: UpdateProduct | null;
    industriesByUnit: OptionsType[];
    tipologiesByIndustry: OptionsType[];
}

const initialState: productState = {
    mutationSuccess: false,
    errors: null,
    reduxErrors: {},
    specialSizeCurve: false,
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
    edition: false,
    industries: [],
    updateProduct: null,
    industriesByUnit: [],
    tipologiesByIndustry: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setData(state, action: PayloadAction<Product[]>) {
            state.product = action.payload;
        },
        setFilterData(state, action: PayloadAction<Product[] | null>) {
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
        clearTelasCombos(state) {
            state.telas = [];
        },
        clearAviosCombos(state) {
            state.avios = [];
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
        changeTelasLength(state, action: PayloadAction<number>) {
            state.telas.length = action.payload;
        },
        changeAviosLength(state, action: PayloadAction<number>) {
            state.avios.length = action.payload;
        },
        setErrors(state, action: PayloadAction<unknown>) {
            state.errors = action.payload;
        },
        setReduxErrors(state, action: PayloadAction<{ idError; msg }>) {
            state.reduxErrors = {
                ...(state.reduxErrors as object),
                [action.payload.idError]: { ...action.payload },
            };
        },
        removeReduxError(state, action: PayloadAction<string>) {
            delete (state.reduxErrors as object)[action.payload];
        },
        clearErrors(state) {
            state.errors = {};
        },
        clearReduxErrors(state) {
            state.reduxErrors = initialState.reduxErrors;
        },
        setEdition(state, action: PayloadAction<boolean>) {
            state.edition = action.payload;
        },
        setSpecialSizeCurve(state, action: PayloadAction<boolean>) {
            state.specialSizeCurve = action.payload;
        },
        setUpdateProduct(state, action: PayloadAction<UpdateProduct>) {
            state.updateProduct = action.payload;
        },
        setMutationState(state, action: PayloadAction<boolean>) {
            state.mutationSuccess = action.payload;
        },
        setIndustriesByUnit(state, action: PayloadAction<OptionsType[]>) {
            state.industriesByUnit = action.payload;
        },
        setTipologiesByIndustry(state, action: PayloadAction<OptionsType[]>) {
            state.tipologiesByIndustry = action.payload;
        },
    },
});

export const {
    setData,
    setFilterData,
    handleProductData,
    addTela,
    clearTelasCombos,
    clearAviosCombos,
    handleTrimCombos,
    changeTelasLength,
    changeAviosLength,
    setErrors,
    removeCombo,
    addTelasArray,
    setEdition,
    setSpecialSizeCurve,
    setUpdateProduct,
    removeReduxError,
    clearErrors,
    setReduxErrors,
    clearReduxErrors,
    setMutationState,
    setIndustriesByUnit,
    setTipologiesByIndustry,
} = productSlice.actions;
export default productSlice.reducer;
