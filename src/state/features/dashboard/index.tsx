import {
    BalanceType,
    ProductionStatusType,
    SkuType,
    PendingApprovals,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PayloadData {
    name: string;
    value: unknown;
}

interface dashboardState {
    balance: BalanceType[];
    estadoDeProduccion: ProductionStatusType[];
    aprobacionesPendientes: PendingApprovals | null;
    margen: { PVP: number; Cost: number; Margin: string } | null;
    skuYPiezasTotales: SkuType[];
    departamento: string;
    temporada: string | number;
    embarques: {
        ShippingDate: string;
        EntryDate: string;
        WarehouseDate: string;
        ProductNumber: number;
    }[];
    muestrasEnviadas: { name: string }[];
    overall: [];
    resumenDeMaterialidades: {
        Description: string;
        Weight: string;
        Percentage: number;
    }[];
}

const initialState: dashboardState = {
    balance: [],
    estadoDeProduccion: [],
    aprobacionesPendientes: null,
    margen: null,
    skuYPiezasTotales: [],
    departamento: "Textil",
    temporada: "",
    embarques: [],
    muestrasEnviadas: [],
    overall: [],
    resumenDeMaterialidades: [],
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        handleDashboardData(state, action: PayloadAction<PayloadData>) {
            state[action.payload.name] = action.payload.value;
        },
    },
});

export const { handleDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
