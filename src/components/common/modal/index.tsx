import React, { FC, ReactNode } from "react";
import ReactDom from "react-dom";

import { Container } from "./ModalStyles";
import { CardBase } from "../cardBase";
import { Box } from "@mui/material";

import { useIconsContext, useModal } from "@components/hooks";

type ModalProps = {
    header?: string;
    content: string | ReactNode;
    loading?: boolean;
};

const Modal: FC<ModalProps> = ({ header = "", content }) => {
    const { closeModal } = useModal();
    const modalContainer: HTMLElement =
        document.getElementById("modal-container")!;
    const { icons } = useIconsContext();

    return (
        <>
            {ReactDom.createPortal(
                <Container>
                    <Box className="overlay open" />
                    <Box className="modal open">
                        <span
                            onClick={() => closeModal()}
                            className="iconWrapper"
                        >
                            {icons["close"]}
                        </span>
                        <CardBase header={header} content={content} />
                    </Box>
                </Container>,
                modalContainer
            )}
        </>
    );
};
export { Modal };
