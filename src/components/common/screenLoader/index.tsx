import React, { FC } from "react";
import ReactDom from "react-dom";

import { Container } from "./LoaderStyles";

import { Box } from "@mui/material";
import styles from "./ScreenLoader.module.css";

type ModalProps = {
    loading: boolean;
};

const ScreenLoader: FC<ModalProps> = ({ loading }) => {
    const loaderContainer: HTMLElement =
        document.getElementById("modal-container")!;

    return (
        <>
            {ReactDom.createPortal(
                <Container>
                    <Box className={`overlay ${loading && "open"}`} />
                    <Box className={`modal ${loading && "open"}`}>
                        <div className={styles.loader} />
                    </Box>
                </Container>,
                loaderContainer
            )}
        </>
    );
};
export { ScreenLoader };
