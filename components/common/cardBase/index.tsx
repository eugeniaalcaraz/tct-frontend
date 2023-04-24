import React, { FC, ReactNode } from "react";
import { Typography, Tooltip } from "@mui/material";
import { Container, HeaderContainer } from "./CardBaseStyles";
import { useIconsContext } from "@components/hooks";

type CardProps = {
    header: string;
    content: string | ReactNode;
};

const CardBase: FC<CardProps> = ({ header, content }) => {
    const { icons } = useIconsContext();
    return (
        <Container elevation={2} sx={{ height: "inherit" }}>
            <HeaderContainer>
                <Typography variant="h2">{header}</Typography>
                {header.toLowerCase() === "balance" && (
                    <Tooltip
                        title="Promedio basado
                    en estado de los productos
                    y dias restantes para 
                    el embarque de los mismos"
                        placement="left"
                        arrow
                    >
                        <div>{icons["info"]}</div>
                    </Tooltip>
                )}
            </HeaderContainer>
            {content}
        </Container>
    );
};

export { CardBase };
