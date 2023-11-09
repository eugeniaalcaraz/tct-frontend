export enum Pages {
    Login = "Login",
    Dashboard = "Dashboard",
    Products = "Products",
    NewProduct = "New Product",
    NewSupplier = "New Supplier",
    UpdateProduct = "Update Product",
    ServerError = "Server Error",
    Suppliers = "Suppliers",
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
    NewFabricColor = "NewFabricColor",
    NewFabricPrint = "NewFabricPrint",
    NewTrimColor = "NewTrimColor",
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
    Buying = "Compra ($)",
    //Selling = "PVP (USD)",
    SellingUy = "PVP ($)",
    DepositDate = "Ingreso a Depósito",
    StoreDate = "Ingreso a Tienda",
}

export enum SupplierHeaders {
    ExpandIcon = "",
    Clasification = "",
    Alias = "Alias",
    supplierTypeId = "Tipo proveedor",
    commercialName = "Nombre comercial",
    vatNumber = "Numero Vat",
    idCountry = "País",
    contactPerson = "Persona contacto",
    email = "Email"
}

export const SupplierHeadersArray = [
    {
        code: "ExpandIcon",
        title: "",
        width: 72,
    },
    {
        code: "performance",
        title: "",
        width: 72,
    },
    {
        code: "alias",
        title: "Alias",
        width: 150,
    },
    {
        code: "supplierType",
        title: "Tipo proveedor",
        width: 150,
    },
    {
        code: "commercialName",
        title: "Nombre comercial",
        width: 150,
    },
    {
        code: "vatNumber",
        title: "Numero Vat",
        width: 125,
    },
    {
        code: "Country",
        title: "País",
        width: 150,
    },
    {
        code: "contactPerson",
        title: "Persona contacto",
        width: 200,
    },
    {
        code: "email",
        title: "Email",
        width: 200,
    }
]

export enum OverallHeaders {
    Category = "RUBRO",
    Total = "COSTO TOTAL",
    Pieces = "PIEZAS",
    Skus = "SKUS",
}
