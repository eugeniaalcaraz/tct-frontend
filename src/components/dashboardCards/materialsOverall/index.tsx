import React, { useState, useCallback, useEffect } from "react";
import { PieWithLabels } from "@components/common/graphs";
import { useAppSelector } from "@/state/app/hooks";
import { getCardValue } from "@/services";

const MaterialsOverall = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { temporada } = useAppSelector((state) => state.dashboard);
    const [resumenDeMaterialidades, setResumen] = useState<
        {
            Description: string;
            Weight: string;
            Percentage: number;
        }[]
    >([]);
    const [slicedData, setData] = useState<
        { name: string; value: number; weight: number }[]
    >([]);

    const loadValues = useCallback(
        async () =>
            setResumen(
                await getCardValue({
                    card: "resumenDeMaterialidades",
                    idMerchant,
                    idSeason: temporada,
                })
            ),
        [resumenDeMaterialidades, temporada]
    );

    const loadData = useCallback(() => {
        const data = resumenDeMaterialidades?.map((material) => ({
            name: material.Description,
            value: Number(material.Percentage),
            weight: Number(material.Weight),
        }));

        setData(data.slice(0, 6));
    }, [resumenDeMaterialidades]);

    useEffect(() => {
        loadValues();
    }, []);

    useEffect(() => {
        loadData();
    }, [resumenDeMaterialidades]);

    return (
        <>
            {resumenDeMaterialidades.length && (
                <PieWithLabels data={slicedData} />
            )}
        </>
    );
};

export { MaterialsOverall };
