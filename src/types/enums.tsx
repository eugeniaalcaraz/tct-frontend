export enum Pages {
    Login = "Login",
    Dashboard = "Dashboard",
    Products = "Products",
    NewProduct = "New Product",
    UpdateProduct = "Update Product",
    ServerError = "Server Error",
}

export enum LocalStorageKeys {
    user = "impacta-user",
    layouts = "layouts",
}

export enum BalanceOptions {
    Acceptable = "Acceptable",
    Attention = "Attention",
    Critical = "Critical",
}

export enum ProdStatusOptions {
    Approval = "Aprobado",
    PProduction = "Pre-Producción",
    Produccion = "Producción",
}

export enum ModalTypes {
    NewProductError = "NewProductError",
}

export enum ApprovalElements {
    QualitiesApprovals = "QualitiesApprovals",
    AviosApprovals = "AviosApprovals",
    ColorsApprovals = "ColorsApprovals",
    PrintsApprovals = "PrintsApprovals",
}

export enum ProductHeaders {
    ExpandIcon = "",
    Picture = "Foto",
    Code = "Código",
    Name = "Nombre",
    Season = "Temporada",
    Supplier = "Proveedor",
    ShipmentDate = "Fecha de Embarque",
    Concept = "Concepto",
    Line = "Línea",
    Unit = "U. de Gestión",
    Category = "Rubro",
    Tipology = "Tipología",
    BodyFit = "Body Fit",
    Composition = "Composition",
    TotalQuanity = "Cantidad Total",
    Margin = "Márgen",
    Buying = "Compra",
    Selling = "PVP (USD)",
    SellingUy = "PVP ($)",
    DepositDate = "Ingreso a Depósito",
    StoreDate = "Ingreso a Tienda",
}

export enum OverallHeaders {
    Category = "RUBRO",
    Total = "COSTO TOTAL",
    Pieces = "PIEZAS",
    Skus = "SKUS",
}
