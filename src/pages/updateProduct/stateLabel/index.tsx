import { useIconsContext } from "@components/hooks";
import { Box } from "@mui/material";
import React, { FC } from "react";
import styles from "./StateLabel.module.css";

type StatusLableProps = {
    status: string;
    setChipStatus?: (...args) => void;
    openList?: boolean;
    dropdown?: boolean;
};

export const StatusLabel: FC<StatusLableProps> = ({
    status,
    setChipStatus,
    openList,
    dropdown = false,
}) => {
    const { icons } = useIconsContext();
    const colorSelector = {
        pendiente: "#D9D9D9",
        enviado: "#DBC4D2",
        aprobado: "#AAB96E",
        reprobado: "#EB9D6F",
        recibido: "#8297CA",
    };
    const textColorSelector = {
        pendiente: "#000000",
        enviado: "#000000",
        aprobado: "#FFFFFF",
        reprobado: "#FFFFFF",
        recibido: "#FFFFFF",
    };

    return (
        <Box
            sx={{
                borderRadius: "15px",
                minWidth: "90px",
                width: "fit-content",
                padding: "4px 17px",
                backgroundColor: colorSelector[status],
                color: textColorSelector[status],
                height: "23px",
                textTransform: "capitalize",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "0.5rem",
                "& > span > svg > path": {
                    fill: textColorSelector[status],
                },
                "@media print": {
                    "-webkit-print-color-adjust": "exact",
                },
            }}
            onClick={() => setChipStatus && setChipStatus(status)}
        >
            <span>{status}</span>
            {dropdown && (
                <span className={styles.icon}>
                    {icons[openList ? "up" : "down"]}
                </span>
            )}
        </Box>
    );
};
