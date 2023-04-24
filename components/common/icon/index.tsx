import React, { FC, ReactNode } from "react";
import { Menu, Search, Plus, Filter, Close, Logout } from "@/assets/icons";

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
};

const Icon: FC<IconProps> = ({ name }) => <>{icons[name]}</>;

export { Icon };
