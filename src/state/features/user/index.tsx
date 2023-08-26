import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    idMerchant: string;
}

const initialState: userState = {
    // TODO: eliminar estado harcodeado
    idMerchant: "1",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIdMerchant(state, action: PayloadAction<string>) {
            state.idMerchant = action.payload;
        },
    },
});

export const { setIdMerchant } = userSlice.actions;
export default userSlice.reducer;
