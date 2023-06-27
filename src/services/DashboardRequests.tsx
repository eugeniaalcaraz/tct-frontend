import { getErrorMessage } from "@/utils";
import { getJsonRequest } from "./BaseRequests";

const BASE_URL = `/dashboard`;

export const getCardValue = async ({ card, idMerchant, idSeason }) => {
    const query = getQuery(card);

    if (query !== -1) {
        const path = `${BASE_URL}/${query}/${idMerchant}/${idSeason}`;
        try {
            return await getJsonRequest(path);
        } catch (error) {
            throw new Error(getErrorMessage(error));
        }
    }
};

export const getCalendarValue = async (idMerchant, idSeason, month, year) => {
    const path = `${BASE_URL}/getCalendarData/${idMerchant}/${idSeason}/${month}/${year}`;

    try {
        return await getJsonRequest(path);
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

const getQuery = (card) => {
    switch (card) {
        // case "balance":
        //     return "getBalanceData";
        // case "estadoDeProduccion":
        //     return "getProductsStatus";
        // case "aprobacionesPendientes":
        //     return "getPendantApprovals";
        // case "margen":
        //     return "getSeasonMargin";
        // case "muestrasEnviadas":
        //     return "getTopSixSentSamples";
        // case "skuYPiezasTotales":
        //     return "getAllSKUsAndPieces";
        default:
            return -1;
    }
};
