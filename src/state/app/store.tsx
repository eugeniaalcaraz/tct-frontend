import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "@/state/features/filters";
import userReducer from "@/state/features/user";
import dashboardReducer from "@/state/features/dashboard";
import productReducer from "@/state/features/product";
import modalReducer from "@/state/features/modal";
import updatedProductReducer from "@/state/features/updatedProduct";
import supplierReducer from "@/state/features/supplier";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        user: userReducer,
        dashboard: dashboardReducer,
        product: productReducer,
        modal: modalReducer,
        updatedProduct: updatedProductReducer,
        supplier: supplierReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
