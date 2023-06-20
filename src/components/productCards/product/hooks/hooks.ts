export const initialProductState = {
    selectedBrand: "",
    selectedSeason: "",
    selectedYear: "",
    selectedTypology: "",
    selectedProductNumber: "",
    selectedManagementUnit: "",
    finalNumber: "",
};

export function productReducer(state, action) {
    switch (action.type) {
        case "setSelectedBrand":
            console.log(state);
            return {
                ...initialProductState,
                selectedBrand: action.payload,
                finalNumber:
                    action.payload +
                    state.selectedSeason +
                    state.selectedYear +
                    state.selectedTypology +
                    state.selectedProductNumber,
            };
        case "setSelectedSeason":
            return {
                ...initialProductState,
                selectedSeason: action.payload,
                finalNumber:
                    state.selectedBrand +
                    action.payload +
                    state.selectedYear +
                    state.selectedTypology +
                    state.selectedProductNumber,
            };
        case "setSelectedYear":
            return {
                ...initialProductState,
                selectedYear: action.payload,
                finalNumber:
                    state.selectedBrand +
                    state.selectedSeason +
                    action.payload +
                    state.selectedTypology +
                    state.selectedProductNumber,
            };
        case "setSelectedTypology":
            return {
                ...initialProductState,
                selectedTypology: action.payload,
                finalNumber:
                    state.selectedBrand +
                    state.selectedSeason +
                    state.selectedYear +
                    action.payload +
                    state.selectedProductNumber,
            };
        case "setSelectedProductNumber":
            return {
                ...initialProductState,
                selectedProductNumber: action.payload,
                finalNumber:
                    state.selectedBrand +
                    state.selectedSeason +
                    state.selectedYear +
                    state.selectedTypology +
                    action.payload,
            };
        case "setSelectedManagementUnit":
            return {
                ...initialProductState,
                selectedManagementUnit: action.payload,
                finalNumber:
                    state.selectedBrand +
                    state.selectedSeason +
                    state.selectedYear +
                    state.selectedTypology +
                    action.payload,
            };
        default:
            throw new Error();
    }
}
