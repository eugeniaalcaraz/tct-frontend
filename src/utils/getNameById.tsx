export const getSeasonById = (id, allSeasons) => {
    const season = allSeasons?.find(
        (season) => Number(season.IdSeason) === Number(id)
    );
    return season?.SeasonName ?? "-";
};

export const getSupplierById = (id, suppliers) => {
    const supplier = suppliers?.find(
        (supplier) => Number(supplier.Id) === Number(id)
    );
    return supplier ? `${supplier.Name} ${supplier.Lastname}` : "-";
};

export const getFabricById = (id, fabrics) => {
    const fabric = fabrics?.find(
        (fabric) => Number(fabric.IdFabric) === Number(id)
    );
    return fabric?.Description ?? "-";
};

export const getNameById = (id, category) => {
    const item = category?.find((item) => Number(item.Id) === Number(id));
    return item?.Description ?? "-";
};

export const getCountryById = (id, category) => {
    const item = category?.find((item) => Number(item.Id) === Number(id));
    return item?.Name ?? "-";
};

export const getTypeOfShipmentById = (id, category) => {
    const item = category?.find((item) => Number(item.Id) === Number(id));
    return item?.Description ?? "-";
};

export const getStatus = (id) => {
    switch (id) {
        case 1:
            return "recibido";
        case 2:
            return "enviado";
        case 3:
            return "aprobado";
        case 4:
            return "reprobado";
        default:
            return "pendiente";
    }
};

export const getStatusId = (status) => {
    switch (status) {
        case "recibido":
            return 1;
        case "enviado":
            return 2;
        case "aprobado":
            return 3;
        case "reprobado":
            return 4;
        default:
            return 5;
    }
};

export const getSampleType = (id) => {
    switch (id) {
        case 1:
            return "Aprobación";
        case 2:
            return "Pre Producción";
        case 3:
            return "Producción";
        default:
            return "-";
    }
};
