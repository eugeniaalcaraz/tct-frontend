import React from "react";
import { useAppSelector } from "@/state/app/hooks";
import { Container, State } from "./BalanceStyles";
import { Tooltip, Typography } from "@mui/material";

const Balance = () => {
    const { balance } = useAppSelector((state) => state.dashboard);

    const {
        avioInCritical,
        aviosInAttention,
        aviosInOk,
        fabricInCritical,
        fabricInAttention,
        fabricInOk,
        colorInCritical,
        colorInAttention,
        colorInOk,
        sampleInCritical,
        sampleInAttention,
        sampleInOk,
    } = balance;

    const balanceStates = [
        {
            Type: "Crítico",
            value:
                Number(avioInCritical) +
                Number(fabricInCritical) +
                Number(colorInCritical) +
                Number(sampleInCritical),
            values: [
                avioInCritical,
                fabricInCritical,
                colorInCritical,
                sampleInCritical,
            ],
        },
        {
            Type: "Atención",
            value:
                Number(aviosInAttention) +
                Number(fabricInAttention) +
                Number(colorInAttention) +
                Number(sampleInAttention),
            values: [
                aviosInAttention,
                fabricInAttention,
                colorInAttention,
                sampleInAttention,
            ],
        },
        {
            Type: "Aceptable",
            value:
                Number(aviosInOk) +
                Number(fabricInOk) +
                Number(colorInOk) +
                Number(sampleInOk),
            values: [aviosInOk, fabricInOk, colorInOk, sampleInOk],
        },
    ];

    return (
        <Container>
            {balanceStates?.map(({ Type, value, values }) => (
                <Tooltip
                    key={Type}
                    title={
                        <>
                            <Typography variant="body2">
                                Muestras: % {Math.round(values[3])}
                            </Typography>
                            <Typography variant="body2">
                                Avios: % {Math.round(values[0])}
                            </Typography>
                            <Typography variant="body2">
                                Telas: % {Math.round(values[1])}
                            </Typography>
                            <Typography variant="body2">
                                Colores: % {Math.round(values[2])}
                            </Typography>
                        </>
                    }
                    placement="right"
                    arrow
                >
                    <State className={Type}>
                        {!isNaN(Math.round((value * 100) / 400)) && (
                            <p>{`${Math.round(
                                (value * 100) / 400
                            )} % ${Type}`}</p>
                        )}
                    </State>
                </Tooltip>
            ))}
        </Container>
    );
};

export { Balance };
