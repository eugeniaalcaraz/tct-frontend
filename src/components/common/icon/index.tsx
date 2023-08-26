import React, { FC, ReactNode } from "react";
import {
    Menu,
    Search,
    Plus,
    Filter,
    Close,
    Logout,
    Download,
    Upload,
    Down,
    Up,
    Alert,
} from "@/assets/icons";

type IconProps = {
    name: string;
};

interface iconObject {
    [key: string]: ReactNode;
}

const icons: iconObject = {
    menu: <Menu />,
    search: <Search />,
    plus: <Plus />,
    filter: <Filter />,
    close: <Close />,
    logout: <Logout />,
    download: <Download />,
    upload: <Upload />,
    down: <Down />,
    up: <Up />,
    alert: <Alert />,
};

const Icon: FC<IconProps> = ({ name }) => <>{icons[name]}</>;

export { Icon };
