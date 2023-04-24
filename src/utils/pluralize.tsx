export const pluralize = (count: number | string, noun: string, suffix = "s") =>
    `${noun}${count !== 1 ? suffix : ""}`;
