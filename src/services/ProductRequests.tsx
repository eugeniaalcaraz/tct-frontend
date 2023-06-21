import { getErrorMessage } from "@/utils";
import { getJsonRequest, postJsonRequest } from "./BaseRequests";

const BASE_URL = `/merchant`;
const BASE_LISTING = "/listing";

export const getProducts = async ({
    idMerchant,
    idSeason,
    idDesigner,
    idFabric,
    idDepartment,
    idSupplier,
    idTipology,
    idStatus,
    ProductName,
    ProductPrice,
    ProductWeight,
    idOrigin,
    idDestination,
    idShippingType,
    shippingDate,
    quantity,
}) => {
    const path = `/listing/getAllProductsWithFilters/${idMerchant}/${idSeason}/${idDesigner}/${idFabric}/${idDepartment}/${idSupplier}/${idTipology}/${idStatus}/${ProductName}/${ProductPrice}/${ProductWeight}/${idOrigin}/${idDestination}/${idShippingType}/${shippingDate}/${quantity}`;

    try {
        return await getJsonRequest(path);
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getMerchantIndustryDropdownValue = async ({
    idManagementUnit,
    idMerchant,
}) => {
    const path = `${BASE_URL}/getMerchantIndustries/${idMerchant}/${idManagementUnit}`;
    try {
        return await getJsonRequest(path);
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getMerchantTypologyDropdownValue = async ({
    idIndustry,
    idMerchant,
}) => {
    const path = `${BASE_URL}/getTipologies/${idMerchant}/${idIndustry}`;
    try {
        return await getJsonRequest(path);
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getDropdownValues = async ({ card, idMerchant }) => {
    const query = getQuery(card);

    if (query !== -1) {
        const path = `${BASE_URL}/${query}/${idMerchant}`;
        try {
            return await getJsonRequest(path);
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }
};

export const getListingFilters = async ({ card, idMerchant }) => {
    const query = getListingPath(card);
    if (query !== -1) {
        const path = `${BASE_LISTING}/${query}/${idMerchant}`;
        try {
            return await getJsonRequest(path);
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }
};

export const getApprovalsOfProduct = async (idProduct) => {
    const path = `/approvals/getApprovals/${idProduct}`;
    try {
        return await getJsonRequest(path);
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const createProduct = async ({
    formData,
    idMerchant,
    existingQuality = false,
}) => {
    const path = `/dataSheet/saveProduct`;
    const body = existingQuality
        ? getBodyWithExitingQuality(formData, idMerchant)
        : getBody(formData, idMerchant);

    console.log({ body });

    try {
        const response = await postJsonRequest(path, body);
        return response;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

const getQuery = (card) => {
    switch (card) {
        case "seasons":
            return "getMerchantSeasons";
        case "managementUnit":
            return "getMerchantManagmentUnits";
        case "designers":
            return "getMerchantDesigners";
        case "fabrics":
            return "getFabrics";
        case "composition":
            return "getMerchantFibers";
        case "localization":
            return "getPlacements";
        case "colors":
            return "getColors";
        case "trims":
            return "getTrims";
        case "countries":
            return "getCountries";
        case "supplier":
            return "getMerchantSuppliers";
        case "typeOfshipment":
            return "getShippingTypes";
        case "brands":
            return "getMerchantBrands";
        case "concepts":
            return "getMerchantConcepts";
        case "lines":
            return "getMerchantLines";
        case "rises":
            return "getMerchantRise";
        case "bodyFit":
            return "getMerchantBodyFit";
        default:
            return -1;
    }
};

const getListingPath = (name) => {
    switch (name) {
        case "status":
            return "getStatus";
        case "allSeasons":
            return "getSeasons";
        default:
            return -1;
    }
};

const getBodyWithExitingQuality = (formData, idMerchant) => {
    return {
        ...formData,
        idExistingProduct: "0",
        quantity: Number(formData.quantity),
        sizeCurveType: 1, //TODO: sacar estos datos desde el ui
        idSizeCurve: 1, //TODO: sacar estos datos desde el ui
        proyecta: false, //TODO: sacar estos datos desde el ui
        idMeasurmentTable: 1, //TODO: sacar estos datos desde el ui
        idSupplier: 1, //TODO: sacar estos datos desde el ui
        idModeling: 1,
        cost: Number(formData.cost),
        costInStore: Number(formData.precioVenta),
        pictures: [], // formData.fotos
    };
};

const getBody = (formData, idMerchant) => {
    console.log({ formDataBody: formData });

    return {
        ...formData,
        idExistingProduct: "0",
        sizeCurveType: 1, //TODO: sacar estos datos desde el ui
        idSizeCurve: 1, //TODO: sacar estos datos desde el ui
        proyecta: false, //TODO: sacar estos datos desde el ui
        idMeasurmentTable: 1, //TODO: sacar estos datos desde el ui
        idSupplier: 1, //TODO: sacar estos datos desde el ui
        quantity: Number(formData.quantity),
        idModeling: 1,
        cost: Number(formData.cost),
        costInStore: Number(formData.precioVenta),
        pictures: [], // formData.fotos
    };
};
