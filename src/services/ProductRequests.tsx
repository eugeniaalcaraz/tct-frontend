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
        idSampleStatus: 1,
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
        idExistingProduct: "0",
        year: Number(formData.year),
        weight: Number(formData.weight),
        name: formData.nombreDelProducto,
        quantity: Number(formData.quantity),
        idModeling: 1,
        idCareLabel: "1", //este es viejo, pero se manda hardcoded en 1,
        measurmentTable: formData.medidas,
        idModelingStatus: 1,
        idStatusMeasurmentTable: 1,
        idShoeMaterial: Number(formData.idShoeMaterial ?? 0),
        idCountry: Number(formData.idCountry),
        cost: Number(formData.cost),
        costInStore: Number(formData.precioVenta),
        pictures: formData.fotos, // formData.fotos
        idSupplier: Number(formData.idSupplier),
    };

    delete finalObj.nombreDelProducto;
    delete finalObj.precioVenta;
    delete finalObj.cantidadDeAvios;
    delete finalObj.cantidadDeTelas;
    delete finalObj.peso;
    // delete finalObj["porcentaje-0-0"];
    // delete finalObj["composicion-0"];
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
        idSampleStatus: 1,
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
        idExistingProduct: "0",
        year: Number(formData.year),
        weight: Number(formData.weight),
        name: formData.nombreDelProducto,
        quantity: Number(formData.quantity),
        idModeling: 1,
        idCareLabel: "1", //este es viejo, pero se manda hardcoded en 1,
        measurmentTable: formData.medidas,
        idModelingStatus: 1,
        idStatusMeasurmentTable: 1,
        idShoeMaterial: Number(formData.idShoeMaterial ?? 0),
        idCountry: Number(formData.idCountry),
        cost: Number(formData.cost),
        costInStore: Number(formData.precioVenta),
        pictures: formData.fotos, // formData.fotos
        idSupplier: Number(formData.idSupplier),
    };

    delete finalObj.nombreDelProducto;
    delete finalObj.precioVenta;
    delete finalObj.cantidadDeAvios;
    delete finalObj.cantidadDeTelas;
    delete finalObj.peso;
    // delete finalObj["porcentaje-0-0"];
    // delete finalObj["composicion-0"];
    delete finalObj.fotos;
    delete finalObj.medidas;
    // delete finalObj["nombreNuevoFabric-0"];
    // delete finalObj["weight-0"];
    // delete finalObj["composicion-0-0"];

    return finalObj;
};
