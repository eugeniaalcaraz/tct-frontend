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

    // try {
    //     const response = await postJsonRequest(path, body);
    //     return response;
    // } catch (error) {
    //     throw new Error(getErrorMessage(error));
    // }
};

const getQuery = (card) => {
    switch (card) {
        case "seasons":
            return "getMerchantSeasons";
        case "tipology":
            return "getTipologies";
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
        case "industries":
            return "getMerchantIndustries";
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
        // ...formData,
        idExistingProduct: "0",
        name: formData.nombreDelProducto,
        quantity: Number(formData.cantidadEmbarque),
        idCollection: Number(formData.temporada),
        idModeling: 1,
        detail: formData.descripcion,
        weight: 0,
        idMeasurmentTable: 1,
        idCareLabel: "1",
        idSupplier: Number(formData.proveedor),
        // idDepartment: Number(formData.departamento),
        // sizeCurve: [
        //     Number(formData["XXS"] ?? 0),
        //     Number(formData["XS"] ?? 0),
        //     Number(formData["S"] ?? 0),
        //     Number(formData["M"] ?? 0),
        //     Number(formData["L"] ?? 0),
        //     Number(formData["XL"] ?? 0),
        //     Number(formData["XXL"] ?? 0),
        //     Number(formData["3XL"] ?? 0),
        //     Number(formData["4XL"] ?? 0),
        // ],
        cost: Number(formData.costo),
        costInStore: Number(formData.precioVenta),
        idDesigner: Number(formData["diseñador"]),
        idSeason: Number(formData.temporada),
        idMerchant: Number(idMerchant),
        idShipping: String(formData.embarque),
        // idCountry: Number(formData.origen),
        idCountryDestination: Number(formData.destino),
        shippingDate: formData.fecha,
        idTipology: Number(formData.tipologia),
        pictures: [], // formData.fotos
        // fabrics:
        //     formData.combos.length === 0
        //         ? [
        //               {
        //                   idFabric: Number(formData.calidad),
        //                   description: "",
        //                   weight: 0,
        //                   idColor: 0,
        //                   placement: Number(formData.localizacion),
        //                   colorCount: 0,
        //                   printDescription: "",
        //                   composition: [],
        //               },
        //           ]
        //         : formData.combos.map(({ fabric, colorAmount, name }) => ({
        //               idFabric: Number(formData.calidad),
        //               description: "",
        //               weight: 0,
        //               idColor: fabric === "solid" ? Number(name) : 0,
        //               placement: Number(formData.localizacion),
        //               colorCount:
        //                   fabric === "printed" ? Number(colorAmount) : 0,
        //               printDescription: fabric === "printed" ? name : "",
        //               composition: Object.keys(formData)
        //                   .filter(
        //                       (key) =>
        //                           key.includes("composicion") &&
        //                           formData[key] &&
        //                           formData[`porcentaje-${key[key.length - 1]}`]
        //                   )
        //                   .map((composition) => ({
        //                       idFiber: Number(formData[composition]),
        //                       percentage: Number(
        //                           formData[
        //                               `porcentaje-${
        //                                   composition[composition.length - 1]
        //                               }`
        //                           ]
        //                       ),
        //                   })),
        //           })),

        // avios: formData.trimCombos.map(({ idTrimColor }) => ({
        //     idAvio: Number(formData.tipoAvio),
        //     idColor: Number(idTrimColor ?? 1),
        //     quantity: Number(formData.cantidad),
        // })),
        idBodyFit: Number(formData.bodyfit),
        idLine: Number(formData.idLine),
        idRise: Number(formData.idRise),
    };
};

const getBody = (formData, idMerchant) => {
    console.log({ formDataBody: formData });
    return {
        // ...formData,
        idExistingProduct: "0",
        name: formData.nombreDelProducto,
        quantity: Number(formData.cantidadEmbarque),
        idCollection: Number(formData.temporada),
        idModeling: 1,
        detail: formData.descripcion,
        weight: 0,
        idMeasurmentTable: 1,
        idCareLabel: "1",
        idSupplier: Number(formData.proveedor),
        // idDepartment: Number(formData.departamento),
        // sizeCurve: [
        //     Number(formData["XXS"] ?? 0),
        //     Number(formData["XS"] ?? 0),
        //     Number(formData["S"] ?? 0),
        //     Number(formData["M"] ?? 0),
        //     Number(formData["L"] ?? 0),
        //     Number(formData["XL"] ?? 0),
        //     Number(formData["XXL"] ?? 0),
        //     Number(formData["3XL"] ?? 0),
        //     Number(formData["4XL"] ?? 0),
        // ],
        cost: Number(formData.costo),
        costInStore: Number(formData.precioVenta),
        // idDesigner: Number(formData["diseñador"]),
        idSeason: Number(formData.temporada),
        idMerchant: Number(idMerchant),
        idShipping: String(formData.embarque),
        // idCountry: Number(formData.origen),
        // idCountryDestination: Number(formData.destino),
        // shippingDate: formData.fecha,
        idTipology: Number(formData.tipologia),
        pictures: [], // formData.fotos
        // fabrics:
        //     formData.combos.length === 0
        //         ? [
        //               {
        //                   idFabric: 0,
        //                   description: formData.fabricDescription,
        //                   weight: Number(formData.peso),
        //                   idColor: 0,
        //                   placement: Number(formData.localizacion),
        //                   colorCount: 0,
        //                   printDescription: "",
        //                   composition: Object.keys(formData)
        //                       .filter(
        //                           (key) =>
        //                               key.includes("composicion") &&
        //                               formData[key] &&
        //                               formData[
        //                                   `porcentaje-${key[key.length - 1]}`
        //                               ]
        //                       )
        //                       .map((composition) => ({
        //                           idFiber: Number(formData[composition]),
        //                           percentage: Number(
        //                               formData[
        //                                   `porcentaje-${
        //                                       composition[
        //                                           composition.length - 1
        //                                       ]
        //                                   }`
        //                               ]
        //                           ),
        //                       })),
        //               },
        //           ]
        //         : formData.combos.map(({ fabric, colorAmount, name }) => ({
        //               idFabric: 0,
        //               description: formData.fabricDescription,
        //               weight: Number(formData.peso),
        //               idColor: fabric === "solid" ? Number(name) : 0,
        //               placement: Number(formData.localizacion),
        //               colorCount:
        //                   fabric === "printed" ? Number(colorAmount) : 0,
        //               printDescription: fabric === "printed" ? name : "",
        //               composition: Object.keys(formData)
        //                   .filter(
        //                       (key) =>
        //                           key.includes("composicion") &&
        //                           formData[key] &&
        //                           formData[`porcentaje-${key[key.length - 1]}`]
        //                   )
        //                   .map((composition) => ({
        //                       idFiber: Number(formData[composition]),
        //                       percentage: Number(
        //                           formData[
        //                               `porcentaje-${
        //                                   composition[composition.length - 1]
        //                               }`
        //                           ]
        //                       ),
        //                   })),
        //           })),

        // avios: formData.trimCombos.map(({ idTrimColor }) => ({
        //     idAvio: Number(formData.tipoAvio),
        //     idColor: Number(idTrimColor ?? 1),
        //     quantity: Number(formData.cantidad),
        // })),
        idBodyFit: Number(formData.bodyfit),
        idLine: Number(formData.idLine),
        idRise: Number(formData.idRise),
    };
};
