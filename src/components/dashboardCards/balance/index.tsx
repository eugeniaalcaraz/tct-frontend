import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "@/state/app/hooks";
import { Container, State } from "./BalanceStyles";
import { Tooltip, Typography } from "@mui/material";
import { BalanceType } from "@/types";
import { getCardValue } from "@/services";

const Balance = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { temporada } = useAppSelector((state) => state.dashboard);
    const [balance, setBalance] = useState<BalanceType>({
        avioInCritical: 0,
        aviosInAttention: 0,
        aviosInOk: 0,
        fabricInCritical: 0,
        fabricInAttention: 0,
        fabricInOk: 0,
        colorInCritical: 0,
        colorInAttention: 0,
        colorInOk: 0,
        sampleInCritical: 0,
        sampleInAttention: 0,
        sampleInOk: 0,
    });

    const loadData = useCallback(async () => {
        setBalance(
            await getCardValue({
                card: "balance",
                idMerchant,
                idSeason: temporada,
            })
        );
    }, [balance, temporada]);

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

    useEffect(() => {
        loadData();
    }, []);

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
