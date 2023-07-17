export const denimSizes = [
    { Id: "23", Description: "23" },
    { Id: "24", Description: "24" },
    { Id: "25", Description: "25" },
    { Id: "26", Description: "26" },
    { Id: "27", Description: "27" },
    { Id: "28", Description: "28" },
    { Id: "29", Description: "29" },
    { Id: "30", Description: "30" },
    { Id: "31", Description: "31" },
    { Id: "32", Description: "32" },
    { Id: "33", Description: "33" },
    { Id: "34", Description: "34" },
    { Id: "35", Description: "35" },
    { Id: "36", Description: "36" },
    { Id: "37", Description: "37" },
    { Id: "38", Description: "38" },
];

export const shoesSizes = [
    { Id: "34", Description: "34" },
    { Id: "35", Description: "35" },
    { Id: "36", Description: "36" },
    { Id: "37", Description: "37" },
    { Id: "38", Description: "38" },
    { Id: "39", Description: "39" },
    { Id: "40", Description: "40" },
];

// const sizeCurveTypeChooser = {
//     2: 1,
//     1: 2,
//     3: 3,
// };

enum tableSizeCurveType {
    SHOE = 1,
    CLOTHES,
    DENIM,
}

export const defaultValues = {
    idMerchantBrand: "",
    idRise: "",
    idBodyFit: "",
    idConcept: "",
    idCountry: "",
    idIndustry: "",
    idLine: "",
    idManagmentUnit: "",
    idSeason: "",
    idShoeMaterial: "",
    idSupplier: "",
    idTipology: "",
    cost: "",
    quantity: "",
    costInStore: "",
    nombreDelProducto: "",
    precioVenta: "",
    cantidadDeTelas: 1,
    cantidadDeAvios: 1,
    proyecta: false,
    fabricCode: "",
    ["placement-0"]: "",
    ["tipoAvio-0"]: "",
    ["cantidadAvio-0"]: "",
};

export const sizeCurveTableTypeChooser = (idManagementUnit: number) => {
    switch (idManagementUnit) {
        case 1:
            return tableSizeCurveType.CLOTHES;
        case 2:
            return tableSizeCurveType.SHOE;
        case 3:
            return tableSizeCurveType.DENIM;

        default:
            return tableSizeCurveType.CLOTHES;
    }
};
