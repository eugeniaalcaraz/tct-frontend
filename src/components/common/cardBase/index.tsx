import React, { FC, ReactNode } from "react";
import { Typography } from "@mui/material";
import { Container, HeaderContainer } from "./CardBaseStyles";

type CardProps = {
    header: string;
    content: string | ReactNode;
};

const CardBase: FC<CardProps> = ({ header, content }) => {
    return (
        <Container elevation={2} sx={{ height: "inherit" }}>
            <HeaderContainer>
                <Typography variant="h2">
                    {header !== "Overall" ? header : ""}
                </Typography>
                {/* {header.toLowerCase() === "balance" && (
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
                )} */}
            </HeaderContainer>
            {content}
        </Container>
    );
};

export { CardBase };
