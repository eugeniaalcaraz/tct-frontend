import React, { useEffect, useState, useCallback } from "react";
import { RadialChart } from "@components/common/graphs";
import { useAppSelector } from "@/state/app/hooks";
import { PendingApprovals as PendingApprovalsType } from "@/types";
import { getCardValue } from "@/services";

const PendingApprovals = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { temporada } = useAppSelector((state) => state.dashboard);

    const [aprobacionesPendientes, setAprobacionesPendientes] =
        useState<PendingApprovalsType | null>(null);
    const [prints, setPrints] = useState<{ name: string; value: number }[]>([]);
    const [qualities, setQualities] = useState<
        {
            name: string;
            value: number;
        }[]
    >([]);
    const [trims, setTrims] = useState<{ name: string; value: number }[]>([]);
    const [fitting, setFitting] = useState<{ name: string; value: number }[]>(
        []
    );

    const loadData = useCallback(
        async () =>
            setAprobacionesPendientes(
                await getCardValue({
                    card: "aprobacionesPendientes",
                    idMerchant,
                    idSeason: temporada,
                })
            ),
        [aprobacionesPendientes, temporada]
    );

    const loadValues = useCallback(() => {
        for (const approval in aprobacionesPendientes) {
            switch (approval) {
                case "PercentageAvios":
                    setTrims([
                        {
                            name: "avíos",
                            value: aprobacionesPendientes[approval] ?? 0,
                        },
                    ]);
                    break;
                case "PercentageColorsAndPrints":
                    setPrints([
                        {
                            name: "colores / estampas",
                            value: aprobacionesPendientes[approval] ?? 0,
                        },
                    ]);
                    break;
                case "PercentageQualities":
                    setQualities([
                        {
                            name: "calidades",
                            value: aprobacionesPendientes[approval] ?? 0,
                        },
                    ]);
                    break;
                case "PercentageModeling":
                    setFitting([
                        {
                            name: "modelaje",
                            value: aprobacionesPendientes[approval] ?? 0,
                        },
                    ]);
                    break;
                default:
                    return;
            }
        }
    }, [aprobacionesPendientes]);

    useEffect(() => {
        loadData();
        return () => {
            setAprobacionesPendientes(null);
        };
    }, []);

    useEffect(() => {
        aprobacionesPendientes && loadValues();
    }, [aprobacionesPendientes]);

    return (
        <div>
            <div
                style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    gap: "2rem",
                }}
            >
                {prints && <RadialChart data={prints} />}
                {qualities && <RadialChart data={qualities} />}
                {trims && <RadialChart data={trims} />}
                {fitting && <RadialChart data={fitting} />}
            </div>
        </div>
    );
};

export { PendingApprovals };
