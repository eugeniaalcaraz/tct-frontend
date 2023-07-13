import { BalanceOptions, ProdStatusOptions, ApprovalElements } from "./enums";

export type SectionsType = {
    name: string;
    sku: number;
    pcs: number;
    estimation?: number;
    difference?: number;
};

export type OptionsType = {
    Id: string;
    Description: number | string;
};

export type TipologyOptions = {
    Id: string;
    Description: string;
    Code: string;
    Weight: string;
};

export type ColorsStateType = {
    Id: string;
    Description: number | string;
    Code: string;
    RGB: string;
};

export type FabricOptionType = {
    Id: string;
    Description: number | string;
    Weight: number;
    Composition: { Description: string; Percentage: number }[];
};

export type BalanceType = {
    Type: BalanceOptions;
    Percetage: number;
};

export type ProductionStatusType = {
    Status: ProdStatusOptions;
    Percentage: string | number;
};

export type SkuType = {
    CategoryName: string;
    CategoryID: number;
    SkuQuantity: number;
    TotalPieces: number;
    TargetSKU: number;
    TargetPCS: number;
    GapSku: number;
    GapPcs: number;
};

export type Fabric = {
    IdFabric: number;
    Description: string;
    Weight: number;
    Composition: { Description: string; Percentage: number }[];
};

export type Designers = {
    Id: number;
    Name: string;
    LastName: string;
};

export type WrongObjectType = {
    Id: number;
    Description: string;
};

export type OptionsTypeName = {
    Id: number;
    Name: string;
};

export type Brands = {
    Id: number;
    Name: string;
    Code: string;
    Id_merchant: number;
};

export type CompositionFabricCombo = {
    idFiber: number;
    percentage: number;
};

export type ColorCombo = {
    idColor: number;
    sizeCurve: string[];
    idStatus: number;
};

export type PrintCombo = {
    nombre: string;
    cantidadColor: number;
    sizeCurve: string[];
    idStatus: number;
};

export type FabricComboMaterial = {
    idFabric: string;
    idStatus: number;
    description: string;
    saveDuplicateFabric?: number;
    consumption: number;
    weight: number;
    colors: ColorCombo[];
    prints: PrintCombo[];
    placement: number;
    composition: CompositionFabricCombo[];
};

export type FabricCombo = FabricComboMaterial & {
    idCountryDestination: number;
    idShipping: number;
    entryDate: string;
    warehouseEntryDate: string;
    shippingDate: string;
    quantity: number;
};

export type Dropdowns = {
    label: string;
    name: string;
    options: OptionsType[] | null;
};

export type Suppliers = {
    Id: number;
    Name: string;
    Lastname: string;
};

export type Product = {
    idSampleStatus: number;
    sampleDate: string | Date;
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
    telas: [
        {
            idFabric: number;
            idStatus: number;
            description: string;
            consumption: number;
            weight: string;
            placement: number;
            composition: [
                {
                    idFiber: number;
                    percentage: number;
                }
            ];
            colors: [
                {
                    idColor: number;
                    sizeCurve: number[];
                    idStatus: number;
                }
            ];
            prints: [
                {
                    nombre: string;
                    cantidadColor: string;
                    sizeCurve: number[];
                    idStatus: number;
                }
            ];
            entryDate: string | Date;
            shippingDate: string | Date;
            warehouseEntryDate: string | Date;
            idCountryDestination: number;
            idShipping: number;
            quantity: number;
        }
    ];
    avios: [
        {
            idAvio: number;
            idStatus: number;
            idColor: number;
            quantity: number;
            idShipping: string;
            idCountryDestination: string;
            shippingDate: string;
            entryDate: string;
            warehouseEntryDate: string;
            colors: [
                {
                    idColor: number;
                    idStatus: number;
                }
            ];
        }
    ];
    sizeCurveType: number;
    extendedSize: boolean;
    idDesigner: number;
    idMerchant: number;
    idExistingProduct: string;
    name: string;
    idModeling: number;
    weight: 200;
    modelingDate: string | Date;
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
};

export type Avios = {
    idAvio: number;
    idColor: number;
    idStatus: number;
    quantity: number;
    shippingDate: string;
    warehouseEntryDate: string;
    idShipping: string;
    idCountryDestination: string;
    entryDate: string;
    colors: { idColor: number; idStatus: number }[];
};

export type UpdateProduct = {
    avios: Trims[];
    basicInfo: basicInfo;
    comboColorAvios: [ComboColorAvios[]];
    comboFabricColors: [ComboFabrics[]];
    comboFabricPrints: [ComboFabrics[]];
    fabrics: Fabrics[];
    productPictures: string;
};

export type Trims = {
    entryDate: Date | string;
    id: number;
    idAvio: number;
    idCountryDestination: number;
    idProduct: number;
    idShipping: number;
    idStatus: number;
    quantity: number;
    shippinDate: Date | string;
    warehouseEntryDate: Date | string;
    colors: {
        id: number;
        idcomboavio: number;
        idcolor: number;
        idstatus: number;
        statusdate: Date | string;
    }[];
};

export type basicInfo = {
    cost: string;
    costinstore: string;
    detail: string;
    extendedSize: number;
    id: number;
    idBodyFit: number;
    idConcept: number;
    idCountry: number;
    idDesigner: number;
    idIndustry: number;
    idInspection: number;
    idLine: number;
    idMerchant: number;
    idMerchantBrand: number;
    idModelingStatus: number;
    idRise: number;
    idSampleStatus: number;
    idSeason: number;
    idStatus: number;
    idStatusMeasurementTable: number;
    idSupplier: number;
    idTipology: number;
    measurementTable: { type: "Buffer"; data: string | number[] };
    modelingDate: Date | string;
    name: string;
    productNumber: number;
    proyecta: number;
    quantity: number;
    sampleDate: Date | string;
    sizeCurveType: number;
    weight: string;
    year: number;
};

export type Fabrics = {
    consumption: string;
    entryDate: Date | string;
    id: number;
    idCountryDestination: number;
    idFabric: number;
    idPlacement: number;
    idShipping: number;
    idStatus: number;
    quantity: number;
    shippinDate: Date | string;
    warehouseEntryDate: Date | string;
    comboColors: {
        id: number;
        idComboFabric: number;
        idColor: number;
        idStatus: number;
        idSizeCurve: number;
        sizeCurve: number[];
    }[];
    comboPrints: {
        id: number;
        idComboFabric: number;
        idPrint: number;
        idStatus: number;
        idSizeCurve: number;
        sizeCurve: number[];
    }[];
    composition: [];
    description: string;
    weight: string;
};

export type PendingApprovals = {
    PercentegeAvios: number;
    PercentegeColorsAndPrints: number;
    PercentageQualities: number;
};

export type ComboColorAvios = {
    id: number;
    idColor: number;
    idComboAvio: number;
    idStatus: number;
    statusDate: Date | string | null;
};

export type ComboFabrics = {
    id: number;
    idColor: number;
    idComboFabric: number;
    idSizeCurve: number;
    idStatus: number;
};

export type AllSeasons = {
    IdSeason: number;
    SeasonName: string;
};

export type Approvals = {
    Tipo: ApprovalElements;
    Estado: string;
    Responsable: string;
    Fecha: string;
};

export type UpdatedProductData = {
    idProduct: string;
    idManagmentUnit: string | number;
    productNumber: number;
    idSampleStatus: number;
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
    telas: [
        {
            idFabric: string;
            idStatus: number;
            description: string;
            consumption: number;
            weight: string;
            placement: number;
            composition: [
                {
                    idFiber: number;
                    percentage: number;
                }
            ];
            colors: [
                {
                    idColor: number;
                    sizeCurve: number[];
                    idStatus: number;
                }
            ];
            prints: [
                {
                    nombre: string;
                    cantidadColor: string;
                    sizeCurve: number[];
                    idStatus: number;
                }
            ];
            entryDate: Date | string;
            shippingDate: Date | string;
            warehouseEntryDate: Date | string;
            idCountryDestination: number;
            idShipping: number;
            quantity: number;
        }
    ];
    avios: [
        {
            idAvio: number;
            idStatus: number;
            idColor: number;
            quantity: number;
            idShipping: string;
            idCountryDestination: string;
            shippingDate: string;
            entryDate: string;
            warehouseEntryDate: string;
            colors: [
                {
                    idColor: number;
                    idStatus: number;
                }
            ];
        }
    ];
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
    curve: number[];
};

export type OverallType = {
    idIndustry: number;
    industryDescription: string;
    quantity: number;
    cost: number;
    comboColorCount: number;
    comboPrintCount: number;
    tipologies: OverallTipologies[];
};

export type OverallTipologies = {
    idTipology: string;
    idIndustry: string;
    tipologyDescription: string;
    quantity: number;
    cost: number;
    comboColorCount: number;
    comboPrintCount: number;
};
