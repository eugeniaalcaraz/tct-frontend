import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface updatedProductState {
    idProduct: string | number;
    idManagmentUnit: string | number;
    productNumber: number;
    idSampleStatus: number;
    sampleType: string;
    sampleDate: Date | string;
    idMerchantBrand: number;
    idSeason: number;
    year: number;
    idDepartment: number;
    idIndustry: number;
    idTipology: number;
    idConcept: number;
    idLine: number;
    idBodyFit: number;
    idRise: number;
    detail: string;
    proyecta: boolean;
    cost: number;
    idCountry: number;
    idSupplier: number;
    quantity: number;
    fabricCode: string;
    idModelingStatus: number;
    telas: any;
    avios: any;
    sizeCurveType: number;
    extendedSize: false;
    idDesigner: number;
    idMerchant: number;
    idExistingProduct: string;
    name: string;
    idModeling: number;
    weight: number;
    modelingDate: Date | string;
    idCareLabel: string;
    measurmentTable: string;
    idStatusMeasurmentTable: number;
    idShoeMaterial: number;
    costInStore: number;
    pictures: [
        {
            pic: string;
            isMain: number;
        }
    ];
    entryDate: Date | string;
    shippingDate: Date | string;
    warehouseEntryDate: Date | string;
    curve: number[];
}

const initialState: updatedProductState = {
    idProduct: "",
    idManagmentUnit: 0,
    productNumber: 0,
    idSampleStatus: 0,
    sampleType: "",
    sampleDate: "",
    idMerchantBrand: 0,
    idSeason: 0,
    year: 0,
    idDepartment: 0,
    idIndustry: 0,
    idTipology: 0,
    idConcept: 0,
    idLine: 0,
    idBodyFit: 0,
    idRise: 0,
    detail: "",
    proyecta: false,
    cost: 0,
    idCountry: 0,
    idSupplier: 0,
    quantity: 0,
    fabricCode: "",
    idModelingStatus: 0,
    telas: [
        {
            idFabric: "",
            idStatus: 0,
            description: "",
            consumption: 0,
            weight: "0",
            placement: 0,
            composition: [],
            colors: [],
            prints: [],
            entryDate: "",
            shippingDate: "",
            warehouseEntryDate: "",
            idCountryDestination: 0,
            idShipping: 0,
            quantity: 0,
        },
    ],
    avios: [
        {
            idAvio: 0,
            idStatus: 0,
            idColor: 0,
            quantity: 0,
            idShipping: "",
            idCountryDestination: "",
            shippingDate: "",
            entryDate: "",
            warehouseEntryDate: "",
            colors: [],
        },
    ],
    sizeCurveType: 0,
    extendedSize: false,
    idDesigner: 0,
    idMerchant: 0,
    idExistingProduct: "0",
    name: "",
    idModeling: 0,
    weight: 0,
    modelingDate: "",
    idCareLabel: "",
    measurmentTable: "",
    idStatusMeasurmentTable: 0,
    idShoeMaterial: 0,
    costInStore: 0,
    pictures: [{ pic: "", isMain: 0 }],
    entryDate: "",
    shippingDate: "",
    warehouseEntryDate: "",
    curve: [],
};

const updatedProductSlice = createSlice({
    name: "updatedProduct",
    initialState,
    reducers: {
        setData(state, action: PayloadAction<Partial<updatedProductState>>) {
            return { ...state, ...action.payload };
        },
        setTrimColors(state, action: PayloadAction<any>) {
            const { parentIndex, colors } = action.payload;
            state.avios[parentIndex].colors = colors;
        },
        setFabricColors(state, action: PayloadAction<any>) {
            const { parentIndex, colors } = action.payload;
            state.telas[parentIndex].colors = colors;
        },
        setFabricPrints(state, action: PayloadAction<any>) {
            const { parentIndex, prints } = action.payload;
            state.telas[parentIndex].prints = prints;
        },
        setNewTrimColor(state, action: PayloadAction<any>) {
            const { parentIndex, color } = action.payload;
            state.avios[parentIndex].colors.push(color);
        },
        setNewFabricColor(state, action: PayloadAction<any>) {
            const { parentIndex, color } = action.payload;
            state.telas[parentIndex].colors.push(color);
        },
        setNewFabricPrint(state, action: PayloadAction<any>) {
            const { parentIndex, print } = action.payload;
            state.telas[parentIndex].prints.push(print);
        },
        updateSampleStatus(state, action: PayloadAction<number>) {
            state.idSampleStatus = action.payload;
            state.sampleDate = dayjs().format("YYYY-MM-DD");
        },
        updateModelingStatus(state, action: PayloadAction<number>) {
            state.idModelingStatus = action.payload;
            state.modelingDate = dayjs().format("YYYY-MM-DD");
        },
        updateFabricStatus(state, action: PayloadAction<any>) {
            const { index, status } = action.payload;
            state.telas[index].idStatus = status;
        },
        updateFabricColorStatus(state, action: PayloadAction<any>) {
            const { parentIndex, index, status } = action.payload;
            state.telas[parentIndex].colors[index].idStatus = status;
        },
        updateFabricPrintStatus(state, action: PayloadAction<any>) {
            const { parentIndex, index, status } = action.payload;
            state.telas[parentIndex].prints[index].idStatus = status;
        },
        updateTrimColorStatus(state, action: PayloadAction<any>) {
            const { parentIndex, index, status } = action.payload;
            state.avios[parentIndex].colors[index].idStatus = status;
        },
        updateTrimStatus(state, action: PayloadAction<any>) {
            const { index, status } = action.payload;
            state.avios[index].idStatus = status;
        },
        setPicture(state, action: PayloadAction<any>) {
            state.pictures[0].pic = action.payload;
        },
        setMmtTable(state, action: PayloadAction<any>) {
            state.measurmentTable = action.payload;
        },
        saveCurves(state, action: PayloadAction<any>) {
            state.telas.forEach(({ colors }) =>
                colors.forEach((color) => (color.sizeCurve = action.payload))
            );
            state.telas.forEach(({ prints }) =>
                prints.forEach((print) => (print.sizeCurve = action.payload))
            );
        },
        setDestinationCountry(state, action: PayloadAction<any>) {
            state.telas.forEach(
                (tela) => (tela.idCountryDestination = action.payload)
            );
        },
        setShipmentType(state, action: PayloadAction<any>) {
            state.telas.forEach((tela) => (tela.idShipping = action.payload));
        },
    },
});

export const {
    setData,
    setTrimColors,
    setFabricColors,
    setFabricPrints,
    setNewTrimColor,
    setNewFabricColor,
    setNewFabricPrint,
    updateSampleStatus,
    updateModelingStatus,
    updateFabricStatus,
    updateFabricColorStatus,
    updateFabricPrintStatus,
    updateTrimColorStatus,
    updateTrimStatus,
    setPicture,
    saveCurves,
    setDestinationCountry,
    setShipmentType,
    setMmtTable,
} = updatedProductSlice.actions;
export default updatedProductSlice.reducer;
