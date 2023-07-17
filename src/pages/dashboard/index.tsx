import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { urlFormat } from "@/utils";
import { Pages } from "@/types";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { CardBase, Footer, ScreenLoader } from "@/components/common";
import {
    Balance,
    ProductionStatus,
    Shipments,
    Colors,
    PendingApprovals,
    Margin,
    Overall,
    MaterialsOverall,
} from "@components/dashboardCards";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { LocalStorageKeys } from "@/types";
import { initialLayouts } from "./initialLayouts";

import { Container } from "./DashboardStyles";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { handleDashboardData, setCards } from "@/state/features";
import { getCalendarValue, getCardValue } from "@/services";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const dashboard = {
    balance: <Balance />,
    estadoDeProduccion: <ProductionStatus />,
    embarques: <Shipments />,
    aprobacionesPendientes: <PendingApprovals />,
    margen: <Margin />,
    resumenDeMaterialidades: <MaterialsOverall />,
    overall: <Overall />,
    composicionPorColor: <Colors />,
};

const originalItems = [
    "Balance",
    "Estado de producción",
    "Embarques",
    "Aprobaciones pendientes",
    "Margen",
    "Resumen de Materialidades",
    "Overall",
    "Composición por color",
];

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || initialLayouts;

const Dashboard = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const {
        temporada,
        balance,
        estadoDeProduccion,
        aprobacionesPendientes,
        margen,
        overall,
        embarques,
        resumenDeMaterialidades,
        composicionPorColor,
    } = useAppSelector((state) => state.dashboard);

    const dispatch = useAppDispatch();
    const date = dayjs();
    const {
        mutateAsync: getCardsAsync,
        isLoading: cardsLoading,
        isError: cardsError,
    } = useMutation(getCardValue);
    const navigate = useNavigate();

    // eslint-disable-next-line
    const [items, setItems] = useState(originalItems);
    const [breakpoint, setBreakpoint] = useState("lg");
    // eslint-disable-next-line
    const [layouts, setLayouts] = useState(
        JSON.parse(JSON.stringify(originalLayouts))
    );

    const getCardData = useCallback(
        async (idSeason) => {
            dispatch(
                setCards({
                    balance: await getCardsAsync({
                        card: "balance",
                        idMerchant,
                        idSeason,
                    }),
                    estadoDeProduccion: await getCardsAsync({
                        card: "estadoDeProduccion",
                        idMerchant,
                        idSeason,
                    }),
                    aprobacionesPendientes: await getCardsAsync({
                        card: "aprobacionesPendientes",
                        idMerchant,
                        idSeason,
                    }),
                    margen: await getCardsAsync({
                        card: "margen",
                        idMerchant,
                        idSeason,
                    }),
                    embarques: await getCardsAsync({
                        card: "embarques",
                        idMerchant,
                        idSeason,
                    }),
                    overall: await getCardsAsync({
                        card: "overall",
                        idMerchant,
                        idSeason,
                    }),
                    resumenDeMaterialidades: await getCardsAsync({
                        card: "resumenDeMaterialidades",
                        idMerchant,
                        idSeason,
                    }),
                    composicionPorColor: await getCardsAsync({
                        card: "composicionPorColor",
                        idMerchant,
                        idSeason,
                    }),
                })
            );
        },
        [
            temporada,
            balance,
            estadoDeProduccion,
            aprobacionesPendientes,
            margen,
            overall,
            //embarques,
            resumenDeMaterialidades,
            composicionPorColor,
        ]
    );

    const onLayoutChange = (layout, layouts) => {
        saveToLS("layouts", layouts);
    };
    const onBreakpointChange = (breakpoint) => {
        setBreakpoint(breakpoint);
    };

    useEffect(() => {
        Number(temporada) !== 0 && getCardData(temporada);
    }, [temporada]);

    // useEffect(() => {
    //     if (cardsError) {
    //         console.log("error", cardsError);
    //         navigate(urlFormat(Pages.ServerError));
    //     }
    // }, [cardsError]);

    return (
        <>
            <Container>
                <ResponsiveReactGridLayout
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={30}
                    margin={[15, 15]}
                    layouts={layouts}
                    onLayoutChange={onLayoutChange}
                    onBreakpointChange={onBreakpointChange}
                >
                    {items.map((key, index) => (
                        <div
                            key={uuid()}
                            data-grid={initialLayouts[breakpoint][index]}
                        >
                            <CardBase
                                content={
                                    dashboard[
                                        initialLayouts[breakpoint][index].i
                                    ]
                                }
                                header={key}
                            />
                        </div>
                    ))}
                </ResponsiveReactGridLayout>
                <Box sx={{ padding: "2rem 0 3rem 0" }}>
                    <Footer />
                </Box>
            </Container>
            {cardsLoading && <ScreenLoader loading={true} />}
        </>
    );
};

export { Dashboard };

function getFromLS(key) {
    let ls = {};
    try {
        ls = JSON.parse(getLocalStorage(LocalStorageKeys.layouts)) || {};
    } catch (e) {
        /*Ignore*/
    }
    return ls[key];
}

function saveToLS(key, value) {
    setLocalStorage(LocalStorageKeys.layouts, {
        [key]: value,
    });
}
