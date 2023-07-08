export const checkIfError = (name, store) => {
    if (store) {
        return Object.keys(store).includes(name);
    }
    return false;
};

export const checkErrorMessage = (name, store) => {
    if (store) {
        return store[name]?.msg ?? "";
    }
    return "";
};
