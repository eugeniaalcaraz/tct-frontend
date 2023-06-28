import React from "react";
import { createContext, ReactNode, useContext, useMemo } from "react";
import {
    Menu,
    Search,
    Plus,
    Filter,
    Close,
    Logout,
    Info,
    Download,
    Upload,
} from "@/assets/icons";

interface IconsProps {
    icons: { [key: string]: ReactNode };
}
interface IconsProviderProps {
    children: JSX.Element | JSX.Element[];
}

const IconsContext = createContext<IconsProps | undefined>(undefined);

IconsContext.displayName = "IconsContext";

export const IconsProvider = ({ children }: IconsProviderProps) => {
    const icons = useMemo(
        () => ({
            menu: <Menu />,
            search: <Search />,
            plus: <Plus />,
            filter: <Filter />,
            close: <Close />,
            logout: <Logout />,
            info: <Info />,
            download: <Download />,
            upload: <Upload />,
        }),
        []
    );

    return (
        <IconsContext.Provider
            value={{
                icons,
            }}
        >
            {children}
        </IconsContext.Provider>
    );
};

export const useIconsContext = () => {
    const ctx = useContext(IconsContext);

    if (!ctx) {
        throw new Error("You are using Icons out of context.");
    }
    return ctx;
};
