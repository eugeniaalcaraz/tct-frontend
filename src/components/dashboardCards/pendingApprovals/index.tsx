import React, { useEffect, useState, useCallback } from "react";
import { RadialChart } from "@components/common/graphs";
import { useAppSelector } from "@/state/app/hooks";

const PendingApprovals = () => {
    const { aprobacionesPendientes } = useAppSelector(
        (state) => state.dashboard
    );
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
        loadValues();
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
                <RadialChart data={prints} />
                <RadialChart data={qualities} />
                <RadialChart data={trims} />
                <RadialChart data={fitting} />
            </div>
        </div>
    );
};

export { PendingApprovals };
