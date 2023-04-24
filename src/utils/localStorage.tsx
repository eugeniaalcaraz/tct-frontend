import { LocalStorageKeys } from "@/types";

const localStorage: Storage = window.localStorage || undefined;
const sessionStorage: Storage = window.sessionStorage || undefined;

export const getLocalStorage = (key: LocalStorageKeys) => {
    if (localStorage) {
        const value: string = localStorage.getItem(key) || "";
        return value && JSON.parse(value);
    }
};

export const setLocalStorage = (key: LocalStorageKeys, value: object) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const clearLocalStorage = () => {
    localStorage?.clear();
};

export const getSessionStorage = (key: LocalStorageKeys) => {
    if (sessionStorage) {
        const value: string = sessionStorage.getItem(key) || "";
        return value && JSON.parse(value);
    }
};
export const setSessionStorage = (key: LocalStorageKeys, value: object) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const clearSessionStorage = () => {
    sessionStorage?.clear();
};
