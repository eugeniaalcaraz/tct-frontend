export const camelCaseToTitle = (text: string) => {
    const result = text?.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
};

export const camelize = (query: string | number) => {
    const text = query?.toString();
    return text?.replace(
        /(?:^\w|[A-Z]|\b\w|\s+)/g,
        (match: string, index: number) => {
            if (+match === 0) return "";
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        }
    );
};
