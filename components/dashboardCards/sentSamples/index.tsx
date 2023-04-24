import React from "react";
import { useAppSelector } from "@/state/app/hooks";
import { v4 as uuid } from "uuid";
import { Container } from "./SentSamplesStyles";

const SentSamples = () => {
    const { muestrasEnviadas } = useAppSelector((state) => state.dashboard);

    return (
        <Container>
            {muestrasEnviadas.length > 0 ? (
                <>
                    <span>Las siguientes muestras están en camino:</span>
                    <ul>
                        {muestrasEnviadas.map(({ name }) => (
                            <li key={uuid()}>{name}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <span>De momento no hay muestras enviadas.</span>
                </>
            )}
        </Container>
    );
};

export { SentSamples };
