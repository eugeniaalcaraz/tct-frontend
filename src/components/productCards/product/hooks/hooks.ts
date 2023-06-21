export const initialProductState = {
    selectedBrand: "",
    selectedSeason: "",
    selectedYear: "",
    selectedTipology: "",
    selectedProductNumber: "",
    selectedManagementUnit: "",
    selectedIndustry: "",
    finalNumber: "",
};

//IdMarca/Temporada/Año/IdTipologia/NroDeProducto(3 cifras).

export function productReducer(state, action) {
    switch (action.type) {
        case "setSelectedBrand":
            return {
                ...state,
                selectedBrand: action.payload,
                finalNumber: `${action.payload}
                    ${state.selectedSeason} 
                    ${state.selectedYear} 
                    ${state.selectedTipology} 
                    ${state.selectedProductNumber}`,
            };
        case "setSelectedSeason":
            return {
                ...state,
                selectedSeason: action.payload,
                finalNumber: `${state.selectedBrand} 
                ${action.payload} 
                ${state.selectedYear} 
                ${state.selectedTipology} 
                ${state.selectedProductNumber}`,
            };
        case "setSelectedYear":
            return {
                ...state,
                selectedYear: action.payload,
                finalNumber: `${state.selectedBrand} 
                ${state.selectedSeason}
                ${action.payload} 
                ${state.selectedTipology} 
                ${state.selectedProductNumber}`,
            };
        case "setSelectedTipology":
            return {
                ...state,
                selectedTypology: action.payload,
                finalNumber: `${state.selectedBrand} 
                    ${state.selectedSeason} 
                    ${state.selectedYear} 
                    ${action.payload} 
                    ${state.selectedProductNumber}`,
            };
        case "setSelectedProductNumber":
            return {
                ...state,
                selectedProductNumber: action.payload,
                finalNumber: `${state.selectedBrand} 
                    ${state.selectedSeason} 
                    ${state.selectedYear} 
                    ${state.selectedTypology} 
                    ${action.payload}`,
            };
        case "setSelectedManagementUnit":
            return {
                ...state,
                selectedManagementUnit: action.payload,
            };
        case "setSelectedIndustry":
            return {
                ...state,
                selectedIndustry: action.payload,
            };
        default:
            console.error("no type of action found");
    }
}
