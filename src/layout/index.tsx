import React, { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { Navbar, Header, ScreenLoader } from "@/components";
import { handleProductData } from "@/state/features/product";
import {
    getDropdownValues,
    getListingFilters,
} from "@/services/ProductRequests";

import { Page, Container, Overlay } from "./LayoutStyles";
import { urlFormat } from "@/utils";
import { Pages } from "@/types";

const dropdowns = [
    "seasons",
    "tipology",
    "managementUnit",
    "designers",
    "fabrics",
    "composition",
    "localization",
    "colors",
    "trims",
    "countries",
    "supplier",
    "typeOfshipment",
    "status",
    "allSeasons",
    "name",
    "brands",
    "concepts",
    "lines",
    "rises",
    "bodyFit",
    "industries",
    "tipologies",
];

const Layout = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { mutateAsync: filtersAsync, isLoading: filtersLoading } =
        useMutation(getListingFilters);

    const {
        mutateAsync: dropdownsAsync,
        isLoading: dropdownsLoading,
        isError: dropdownsError,
    } = useMutation(getDropdownValues);

    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getCardData = useCallback(() => {
        dropdowns.map((card) => callCardsValues(card));
    }, [dropdowns]);

    const callCardsValues = async (card) => {
        dispatch(
            handleProductData({
                [card]:
                    card === "status" ||
                    card === "allSeasons" ||
                    card === "name"
                        ? await filtersAsync({ card, idMerchant })
                        : await dropdownsAsync({ card, idMerchant }),
            })
        );
    };

    useEffect(() => {
        getCardData();
    }, []);

    const handleMenu = (menuState) => {
        setMenuOpen(menuState);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            navigate(urlFormat(Pages.Dashboard));
        }
    }, [location.pathname]);

    useEffect(() => {
        if (dropdownsError) {
            //navigate(urlFormat(Pages.ServerError));
            console.log(dropdownsError);
        } else if (
            location.pathname !== urlFormat(Pages.ServerError) &&
            location.pathname !== "/"
        ) {
            navigate(location.pathname);
        } else {
            navigate(urlFormat(Pages.Dashboard));
        }
    }, [dropdownsError]);

    return (
        <Page>
            {location.pathname === urlFormat(Pages.ServerError) ? (
                <>
                    <Outlet />
                </>
            ) : (
                <>
                    <Header handleMenu={handleMenu} />
                    <Container>
                        <Navbar open={menuOpen} handleMenu={handleMenu} />
                        {filtersLoading && dropdownsLoading && (
                            <ScreenLoader loading />
                        )}
                        <Outlet />
                    </Container>
                    {menuOpen && <Overlay onClick={() => handleMenu(false)} />}
                </>
            )}
        </Page>
    );
};

export { Layout };
