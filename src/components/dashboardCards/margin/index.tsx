import { useAppSelector } from "@/state/app/hooks";
import React, { useState, useCallback, useEffect } from "react";
import { Container, Values } from "./MarginStyles";
import { formatNumber } from "@/utils";
import { getCardValue } from "@/services";

const Margin = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { temporada } = useAppSelector((state) => state.dashboard);
    const [margen, setMargen] = useState<{
        PVP: number;
        Cost: number;
        Margin: string;
    } | null>(null);

    const loadData = useCallback(async () => {
        setMargen(
            await getCardValue({
                card: "margen",
                idMerchant,
                idSeason: temporada,
            })
        );
    }, [margen, temporada]);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container>
            {margen && (
                <>
                    <p>{margen.Margin} %</p>
                    {/* <Values>
                        <p>USD</p>
                        <p>PVP: ${formatNumber(margen?.PVP)}</p>
                        <p>Costo: ${formatNumber(margen?.Cost)}</p>
                    </Values> */}
                    <Values>
                        <p>PESOS</p>
                        <p>PVP: ${formatNumber(margen?.PVP)}</p>
                        <p>Costo: ${formatNumber(margen?.Cost)}</p>
                    </Values>
                </>
            )}
        </Container>
    );
};

export { Margin };
