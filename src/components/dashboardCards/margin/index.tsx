import { useAppSelector } from "@/state/app/hooks";
import React from "react";
import { Container, Values } from "./MarginStyles";
import { formatNumber } from "@/utils";

const Margin = () => {
    const { margen } = useAppSelector((state) => state.dashboard);

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
