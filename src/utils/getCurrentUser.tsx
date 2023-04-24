import { LocalStorageKeys } from "@/types";
import { getLocalStorage } from "@/utils";

export const getCurrentUser = () => getLocalStorage(LocalStorageKeys.user);
