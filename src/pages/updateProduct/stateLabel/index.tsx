import React, { FC } from "react";

type StatusLableProps = {
    status: string;
};

export const StatusLabel: FC<StatusLableProps> = ({ status }) => {
    const colorSelector = {
        pendiente: "#D9D9D9",
        enviado: "#DBC4D2",
        aprobado: "#AAB96E",
        reprobado: "#EB9D6F",
        recibido: "#8297CA",
    };

    return (
        <div
            style={{
                borderRadius: "15px",
                width: "fit-content",
                padding: "4px 17px",
                backgroundColor: colorSelector[status],
                height: "23px",
            }}
        >
            {status}
        </div>
    );
};
