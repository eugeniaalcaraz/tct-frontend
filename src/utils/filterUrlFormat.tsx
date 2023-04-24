export const filterUrlFormat = (array: string | string[]): string => {
    if (!array || array?.length === 0) return "nofilter";

    if (typeof array === "string") return array;

    return String(array).replace(",", "&");
};
