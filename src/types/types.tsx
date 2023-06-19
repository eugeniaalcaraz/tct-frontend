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
};

export type PrintCombo = {
    nombre: string;
    cantidadColor: number;
    sizeCurve: string[];
};

export type FabricCombo = {
    idFabric: string;
    description: string;
    saveDuplicateFabric?: number;
    consumption: number;
    weight: number;
    colors: ColorCombo[];
    prints: PrintCombo[];
    placement: number;
    printDescription: string;
    composition: CompositionFabricCombo[];
    idCountryDestination: number;
    idShipping: number;
    entryDate: string;
    warehouseEntryDate: string;
    shippingDate: string;
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
    Calidad: string;
    CalidadesAdicionales: number;
    Cantidad: number;
    Departamento: string;
    Estado: string;
    Foto: ArrayBuffer;
    Peso: number;
    Costo: number;
    Margin: number;
    Precio: number;
    IdProduct: number;
    ProductoNombre: string;
    Proveedor: string;
    Tipo: string;
};

export type Avios = {
    idAvio: number;
    idColors: number[];
    quantity: number;
};

export type PendingApprovals = {
    PercentegeAvios: number;
    PercentegeColorsAndPrints: number;
    PercentageQualities: number;
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
