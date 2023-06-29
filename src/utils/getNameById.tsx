export const getSeasonById = (id, allSeasons) => {
    const season = allSeasons.find(
        (season) => Number(season.IdSeason) === Number(id)
    );
    return season?.SeasonName ?? "-";
};

export const getSupplierById = (id, suppliers) => {
    const supplier = suppliers.find(
        (supplier) => Number(supplier.Id) === Number(id)
    );
    return supplier ? `${supplier.Name} ${supplier.Lastname}` : "-";
};

export const getFabricById = (id, fabrics) => {
    const fabric = fabrics.find(
        (fabric) => Number(fabric.IdFabric) === Number(id)
    );
    return fabric?.Description ?? "-";
};

export const getNameById = (id, category) => {
    const item = category.find((item) => Number(item.Id) === Number(id));
    return item?.Description ?? "-";
};
