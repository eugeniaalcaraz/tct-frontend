import { getErrorMessage } from "@/utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseRequest = async (
    path: string,
    method: string,
    body: unknown = null,
    headers: object | null = null,
    blob: boolean | null = false
) => {
    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            method: method,
            headers: {
                "Content-type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : null,
        });
        if (!response.ok) throw new Error();
        return blob ? response.blob() : response.json();
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getJsonRequest = (
    path: string,
    body: unknown = null,
    headers: object | null = null,
    blob: boolean | null = false
) => {
    return baseRequest(path, "GET", body, headers, blob);
};

export const postJsonRequest = (
    path: string,
    body: unknown = null,
    headers: object | null = null
) => {
    return baseRequest(path, "POST", body, headers);
};

export const patchJsonRequest = (
    path: string,
    body: unknown = null,
    headers: object | null = null
) => {
    return baseRequest(path, "PATCH", body, headers);
};

export const deleteJsonRequest = (
    url: string,
    body: unknown = null,
    headers: object | null = null
) => {
    return baseRequest(url, "DELETE", body, headers);
};
