import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "./HeaderStyles";

import { urlFormat } from "@/utils";
import { Pages } from "@/types";

import ProductsHeader from "./ProductsHeader";
import ProductHeader from "./ProductHeader";
import DashboardHeader from "./DashboardHeader";
import NewProductHeader from "./NewProductHeader";
import { useIconsContext } from "@components/hooks";

type HeaderProps = {
    handleMenu: (arg0: boolean) => void;
};

const Header: FC<HeaderProps> = ({ handleMenu }) => {
    // eslint-disable-next-line
    const [scrollPosition, setScrollPosition] = useState(0);
    const [changeBackground, setChangeBackground] = useState(false);
    const location = useLocation();
    const { icons } = useIconsContext();

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        if (position > 10) {
            setChangeBackground(true);
        } else {
            setChangeBackground(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrolledHeader = {
        background: "rgba(241, 241, 241, 0.7)",
        filter: "drop-shadow( 2px 0px 5px rgba(0, 0, 0, 0.25))",
        backdropFilter: "blur(10px)",
    };

    return (
        <Container sx={changeBackground ? scrolledHeader : {}}>
            <button id="menu" onClick={() => handleMenu(true)}>
                {icons["menu"]}
            </button>
            {location.pathname === urlFormat(Pages.Dashboard) ? (
                <DashboardHeader />
            ) : location.pathname === urlFormat(Pages.Products) ? (
                <ProductsHeader />
            ) : location.pathname === urlFormat(Pages.NewProduct) ? (
                <NewProductHeader />
            ) : (
                <ProductHeader />
            )}
        </Container>
    );
};

export { Header };
