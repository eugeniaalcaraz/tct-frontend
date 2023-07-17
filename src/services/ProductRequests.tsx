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
        // case "status":
        //     return "getStatus";
        case "allSeasons":
            return "getSeasons";
        default:
            return -1;
    }
};

const getBodyWithExitingQuality = (formData, idMerchant) => {
    const finalObj = {
        ...formData,
        idSampleStatus: 5,
        idDesigner: 1, //este se deja hardoceado, puede ser que lo soliciten mas adelante
        idMerchant: Number(idMerchant),
        sampleType: 1,
        idRise: Number(formData.idRise),
        idSeason: Number(formData.idSeason),
        idBodyFit: Number(formData.idBodyFit),
        idConcept: Number(formData.idConcept),
        idManagmentUnit: Number(formData.idManagmentUnit),
        idIndustry: Number(formData.idIndustry),
        idLine: Number(formData.idLine),
        idMerchantBrand: Number(formData.idMerchantBrand),
        idTipology: Number(formData.idTipology),
        idExistingProduct: "0",
        year: Number(formData.year ?? 0),
        weight: Number(formData.weight ?? 0),
        name: formData.nombreDelProducto,
        quantity: Number(formData.quantity),
        idModeling: 5,
        idCareLabel: "1", //este es viejo, pero se manda hardcoded en 1,
        measurmentTable: formData.medidas,
        idModelingStatus: 5,
        idStatusMeasurmentTable: 5,
        idShoeMaterial: Number(formData.idShoeMaterial ?? 0),
        idCountry: Number(formData.idCountry),
        cost: Number(formData.cost),
        costInStore: Number(formData.precioVenta),
        pictures: formData.fotos, // formData.fotos
        idSupplier: Number(formData.idSupplier),
        sizeCurveType: Number(formData.sizeCurveType),
    };

    delete finalObj.nombreDelProducto;
    delete finalObj.precioVenta;
    delete finalObj.cantidadDeAvios;
    delete finalObj.cantidadDeTelas;
    delete finalObj.peso;
    delete finalObj["porcentaje-0-0"];
    delete finalObj["composicion-0"];
    delete finalObj["placement-0"];
    delete finalObj["placement-1"];
    delete finalObj["placement-2"];
    delete finalObj["placement-3"];
    delete finalObj["placement-4"];
    delete finalObj["consumoCalidad-0"];
    delete finalObj["consumoCalidad-1"];
    delete finalObj["consumoCalidad-2"];
    delete finalObj["consumoCalidad-3"];
    delete finalObj["consumoCalidad-4"];
    delete finalObj["consumoCalidad-5"];
    delete finalObj["cantidadAvio-0"];
    delete finalObj["tipoAvio-0"];
    delete finalObj["weight-0"];
    delete finalObj["weight-0"];
    delete finalObj["weight-1"];
    delete finalObj["weight-2"];
    delete finalObj["weight-3"];
    delete finalObj["weight-4"];
    delete finalObj["weight-5"];
    delete finalObj["weight-6"];
    delete finalObj["weight-7"];
    delete finalObj["weight-8"];
    delete finalObj.fotos;
    delete finalObj.medidas;
    // delete finalObj["nombreNuevoFabric-0"];
    // delete finalObj["weight-0"];
    // delete finalObj["composicion-0-0"];

    return finalObj;
};

const getBody = (formData, idMerchant) => {
    const finalObj = {
        ...formData,
        idSampleStatus: 5,
        idDesigner: 1, //este se deja hardoceado, puede ser que lo soliciten mas adelante
        idMerchant: Number(idMerchant),
        sampleType: 1,
        idRise: Number(formData.idRise),
        idSeason: Number(formData.idSeason),
        idBodyFit: Number(formData.idBodyFit),
        idConcept: Number(formData.idConcept),
        idManagmentUnit: Number(formData.idManagmentUnit),
        idIndustry: Number(formData.idIndustry),
        idLine: Number(formData.idLine),
        idMerchantBrand: Number(formData.idMerchantBrand),
        idTipology: Number(formData.idTipology),
        idExistingProduct: "0",
        year: Number(formData.year ?? 0),
        weight: Number(formData.weight ?? 0),
        name: formData.nombreDelProducto,
        quantity: Number(formData.quantity),
        idModeling: 5,
        idCareLabel: "1", //este es viejo, pero se manda hardcoded en 1,
        measurmentTable: formData.medidas,
        idModelingStatus: 5,
        idStatusMeasurmentTable: 5,
        idShoeMaterial: Number(formData.idShoeMaterial ?? 0),
        idCountry: Number(formData.idCountry),
        cost: Number(formData.cost),
        costInStore: Number(formData.precioVenta),
        pictures: formData.fotos, // formData.fotos
        idSupplier: Number(formData.idSupplier),
        sizeCurveType: Number(formData.sizeCurveType),
    };

    delete finalObj.nombreDelProducto;
    delete finalObj.precioVenta;
    delete finalObj.cantidadDeAvios;
    delete finalObj.cantidadDeTelas;
    delete finalObj.peso;
    delete finalObj["porcentaje-0-0"];
    delete finalObj["composicion-0"];
    delete finalObj["placement-0"];
    delete finalObj["placement-1"];
    delete finalObj["placement-2"];
    delete finalObj["placement-3"];
    delete finalObj["placement-4"];
    delete finalObj["consumoCalidad-0"];
    delete finalObj["consumoCalidad-1"];
    delete finalObj["consumoCalidad-2"];
    delete finalObj["consumoCalidad-3"];
    delete finalObj["consumoCalidad-4"];
    delete finalObj["consumoCalidad-5"];
    delete finalObj["cantidadAvio-0"];
    delete finalObj["tipoAvio-0"];
    delete finalObj["weight-0"];
    delete finalObj["weight-0"];
    delete finalObj["weight-1"];
    delete finalObj["weight-2"];
    delete finalObj["weight-3"];
    delete finalObj["weight-4"];
    delete finalObj["weight-5"];
    delete finalObj["weight-6"];
    delete finalObj["weight-7"];
    delete finalObj["weight-8"];
    delete finalObj.fotos;
    delete finalObj.medidas;
    // delete finalObj["nombreNuevoFabric-0"];
    // delete finalObj["weight-0"];
    // delete finalObj["composicion-0-0"];

    return finalObj;
};
