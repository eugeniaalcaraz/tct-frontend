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
    data: any[];
    filteredData?: any[] | null;
}

const initialState: productState = {
    data: []
};

const supplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {
        setData(state, action: PayloadAction<any[]>) {
            state.data = action.payload;
        },
        setFilterData(state, action: PayloadAction<any[] | null>) {
            state.filteredData = action.payload;
        },
    },
});

export const {
    setData,
    setFilterData,
    
} = supplierSlice.actions;
export default supplierSlice.reducer;
