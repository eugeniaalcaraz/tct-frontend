import { getErrorMessage } from "@/utils";
import { getJsonRequest, postJsonRequest } from "./BaseRequests";

const BASE_URL = `/merchant`;
const BASE_LISTING = "/listing";

export const getProducts = async ({
    productName,
    idMerchant,
    idSeason,
    idBrand,
    idManagmentUnit,
    idIndustry,
    idTipology,
    idConcept,
    idLine,
    idBodyFit,
    entryDate,
    warehouseEntryDate,
    storeDate,
    idShippingType,
    idFabric,
}) => {
    const path = `/listing/getAllProductsWithFilters/${idMerchant}/${idSeason}/${idBrand}/${idManagmentUnit}/${idIndustry}/${idTipology}/${idConcept}/${idLine}/${idBodyFit}/${entryDate}/${warehouseEntryDate}/${storeDate}/${idShippingType}/${idFabric}/${productName}`;
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

export const getMerchantShoeMaterialDropdownValue = async ({ idMerchant }) => {
    const path = `${BASE_URL}/getMerchantShoeMaterials/${idMerchant}`;
    try {
        return await getJsonRequest(path);
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getMerchantTypologyDropdownValue = async ({ idIndustry }) => {
    const path = `${BASE_URL}/getTipologies/${idIndustry}`;
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

export const getProductById = async (idProduct) => {
    const path = `/merchant/getProduct/${idProduct}`;
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
    const finalObj = {
        ...formData,
        idDesigner: 1, //TODO: sacar estos datos desde el ui
        idMerchant: Number(idMerchant),
        idExistingProduct: "0",
        name: formData.nombre,
        quantity: Number(formData.quantity),
        idModeling: 1,
        idCareLabel: "1", //este es viejo, pero se manda hardcoded en 1,
        measurmentTable: "blobtext", //TODO: sacar estos datos desde el ui,
        idModelingStatus: 1,
        idStatusMeasurmentTable: 1,
        idShoeMaterial: 0,
        idCountry: Number(formData.idCountry),
        cost: Number(formData.cost),
        costInStore: Number(formData.precioVenta),
        pictures: formData.fotos, // formData.fotos
        idSupplier: Number(formData.idSupplier),
    };

    delete finalObj.nombre;
    delete finalObj.precioVenta;
    delete finalObj.cantidadDeAvios;
    delete finalObj.cantidadDeTelas;
    delete finalObj.peso;
    delete finalObj["porcentaje-0"];
    delete finalObj["composicion-0"];
    delete finalObj.fotos;
    delete finalObj.nombreNuevoFabric;
    return finalObj;
};

const getBody = (formData, idMerchant) => {
    const finalObj = {
        ...formData,
        idDesigner: 1, //TODO: sacar estos datos desde el ui
        idMerchant: Number(idMerchant),
        idExistingProduct: "0",
        name: formData.nombre,
        quantity: Number(formData.quantity),
        idModeling: 1,
        idCareLabel: "1", //este es viejo, pero se manda hardcoded en 1
        measurmentTable: "blobtext", //TODO: sacar estos datos desde el ui,
        idModelingStatus: 1,
        idStatusMeasurmentTable: 1,
        idShoeMaterial: 0,
        idCountry: Number(formData.idCountry),
        cost: Number(formData.cost),
        costInStore: Number(formData.precioVenta),
        pictures: formData.fotos, // formData.fotos
        idSupplier: Number(formData.idSupplier),
    };

    delete finalObj.nombre;
    delete finalObj.precioVenta;
    delete finalObj.cantidadDeAvios;
    delete finalObj.cantidadDeTelas;
    delete finalObj.peso;
    delete finalObj["porcentaje-0"];
    delete finalObj["composicion-0"];

    delete finalObj.fotos;
    delete finalObj.nombreNuevoFabric;

    return finalObj;
};
