import React, { useState, useEffect, useCallback } from "react";

import { PieChartGraph } from "@components/common/graphs";
import { useAppSelector } from "@/state/app/hooks";
import { ProductionStatusType } from "@/types";
import { getCardValue } from "@/services";

const ProductionStatus = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { temporada } = useAppSelector((state) => state.dashboard);
    const [estadoDeProduccion, setEstadoDeProduccion] = useState<
        ProductionStatusType[]
    >([]);
    const [data, setData] = useState<any>([]);

    const loadProdStatus = useCallback(
        async () =>
            setEstadoDeProduccion(
                await getCardValue({
                    card: "estadoDeProduccion",
                    idMerchant,
                    idSeason: temporada,
                })
            ),
        [estadoDeProduccion, temporada]
    );

    const loadData = useCallback(
        async () =>
            setData(
                estadoDeProduccion?.map((data) => ({
                    ...data,
                    percentage: Number(data.Percentage),
                    status: data.Status,
                }))
            ),

        [estadoDeProduccion, temporada]
    );

    useEffect(() => {
        loadProdStatus();
        return () => {
            setEstadoDeProduccion([]);
        };
    }, [temporada]);

    useEffect(() => {
        loadData();
    }, [estadoDeProduccion]);

    return <PieChartGraph data={data} />;
};

export { ProductionStatus };
