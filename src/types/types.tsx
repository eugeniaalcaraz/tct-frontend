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
    entrydate: Date | string;
    id: number;
    idavio: number;
    idcountrydestination: number;
    idproduct: number;
    idshipping: number;
    idstatus: number;
    quantity: number;
    shippingdate: Date | string;
    warehouseentrydate: Date | string;
};

export type basicInfo = {
    cost: string;
    costinstore: string;
    detail: string;
    extendedsize: number;
    id: number;
    idbodyfit: number;
    idconcept: number;
    idcountry: number;
    iddesigner: number;
    idindustry: number;
    idinspection: number;
    idline: number;
    idmerchant: number;
    idmerchantbrand: number;
    idmodelingstatus: number;
    idrise: number;
    idsamplestatus: number;
    idseason: number;
    idstatus: number;
    idstatusmeasurementtable: number;
    idsupplier: number;
    idtipology: number;
    measurementtable: { type: "Buffer"; data: string | number[] };
    modelingdate: Date | string;
    name: string;
    productnumber: number;
    proyecta: number;
    quantity: number;
    sampledate: Date | string;
    sizecurvetype: number;
    weight: string;
    year: number;
};

export type Fabrics = {
    consumption: string;
    entrydate: Date | string;
    id: number;
    idcountrydestination: number;
    idfabric: number;
    idplacement: number;
    idshipping: number;
    idstatus: number;
    quantity: number;
    shippingdate: Date | string;
    warehouseentrydate: Date | string;
};

export type PendingApprovals = {
    PercentegeAvios: number;
    PercentegeColorsAndPrints: number;
    PercentageQualities: number;
};

export type ComboColorAvios = {
    id: number;
    idcolor: number;
    idcomboavio: number;
    idstatus: number;
    statusdate: Date | string | null;
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
