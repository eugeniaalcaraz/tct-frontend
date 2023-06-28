import { useAppSelector } from "@/state/app/hooks";
import React from "react";
import { Container, Values } from "./MarginStyles";

const Margin = () => {
    const { margen } = useAppSelector((state) => state.dashboard);

    return (
        <Container>
            {margen && (
                <>
                    <Values>
                        <p>PVP: ${margen?.PVP}</p>
                        <p>Costo: ${margen?.Cost}</p>
                    </Values>

                    <p>{margen.Margin} %</p>
                </>
            )}
        </Container>
    );
};

export { Margin };
