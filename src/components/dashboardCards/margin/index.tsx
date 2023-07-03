import { useAppSelector } from "@/state/app/hooks";
import React from "react";
import { Container, Values } from "./MarginStyles";

const Margin = () => {
    const { margen } = useAppSelector((state) => state.dashboard);

    return (
        <Container>
            {margen && (
                <>
                    <p>{margen.Margin} %</p>
                    <Values>
                        <p>USD</p>
                        <p>PVP: ${margen?.PVP}</p>
                        <p>Costo: ${margen?.Cost}</p>
                    </Values>
                    <Values>
                        <p>PESOS</p>
                        <p>PVP: ${margen?.PVP * 40}</p>
                        <p>Costo: ${margen?.Cost * 40}</p>
                    </Values>
                </>
            )}
        </Container>
    );
};

export { Margin };
