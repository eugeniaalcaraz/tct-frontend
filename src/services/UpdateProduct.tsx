import { getErrorMessage } from "@/utils";
import { postJsonRequest } from "./BaseRequests";
import dayjs from "dayjs";

export const updateProduct = async ({
    idProduct,
    quantity,
    fabricCode,
    idSupplier,
    idCountry,
    cost,
    detail,
    idRise,
    idBodyFit,
    idLine,
    idConcept,
    idIndustry,
    idDepartment,
    year,
    idSeason,
    idMerchantBrand,
    idTipology,
    proyecta,
    sampleType,
    telas,
    avios,
    sizeCurveType,
    extendedSize,
    modelingDate,
    sampleDate,
    weight,
    idSampleStatus,
    idDesigner,
    idMerchant,
    idExistingProduct,
    name,
    idModeling,
    idCareLabel,
    measurmentTable,
    idModelingStatus,
    idStatusMeasurmentTable,
    idShoeMaterial,
    costInStore,
    pictures,
    idManagmentUnit,
}) => {
    const path = `/dataSheet/updateProduct`;

    const body = {
        idProduct: Number(idProduct),
        idSampleStatus: Number(idSampleStatus),
        sampleDate,
        idMerchantBrand: Number(idMerchantBrand),
        idSeason: Number(idSeason),
        year: Number(year),
        idDepartment: Number(idDepartment),
        idIndustry: Number(idIndustry),
        idTipology: Number(idTipology),
        idConcept: Number(idConcept),
        idLine: Number(idLine),
        idBodyFit: Number(idBodyFit),
        idRise: Number(idRise),
        detail,
        proyecta: proyecta === 0 ? false : proyecta === 1 ? true : proyecta,
        cost: Number(cost),
        idCountry: Number(idCountry),
        idSupplier: Number(idSupplier),
        quantity: Number(quantity),
        fabricCode: String(fabricCode),
        idModelingStatus: Number(idModelingStatus),
        telas,
        avios,
        sizeCurveType: Number(sizeCurveType),
        extendedSize:
            extendedSize === 0
                ? false
                : extendedSize === 1
                ? true
                : extendedSize,
        idDesigner: Number(idDesigner),
        idMerchant: Number(idMerchant),
        idExistingProduct: "0",
        name,
        idModeling: Number(idModeling),
        weight: Number(weight),
        modelingDate,
        idCareLabel: "1",
        measurmentTable,
        idStatusMeasurmentTable: Number(idStatusMeasurmentTable),
        idShoeMaterial: Number(idShoeMaterial),
        costInStore: Number(costInStore),
        sampleType: Number(sampleType),
        idManagmentUnit: Number(idManagmentUnit),
        idCollection: 1,
        pictures,
    };

    try {
        const response = await postJsonRequest(path, body);
        return response;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};
