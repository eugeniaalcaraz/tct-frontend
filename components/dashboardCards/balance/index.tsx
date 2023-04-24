import React from "react";
import { useAppSelector } from "@/state/app/hooks";
import { Container, State } from "./BalanceStyles";

const Balance = () => {
    const { balance } = useAppSelector((state) => state.dashboard);

    return (
        <Container>
            {balance.map(({ Type, Percetage }) => (
                <State key={Type} className={Type}>
                    <p>{`${Percetage} % ${Type}`}</p>
                </State>
            ))}
        </Container>
    );
};

export { Balance };
