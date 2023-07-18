import React, { FC, useState, useEffect } from "react";
import { StatusLabel } from ".";
import { useAppSelector } from "@/state/app/hooks";
import { updateProduct } from "@/services/UpdateProduct";

type StateOptionsProps = {
    status: string;
    id: { index: number; parentIndex?: number; item: string };
    updateAction?: (...args) => void;
};

const states = ["pendiente", "enviado", "aprobado", "reprobado", "recibido"];

const StateOptions: FC<StateOptionsProps> = ({ status, id, updateAction }) => {
    const { edition } = useAppSelector((state) => state.product);
    const updateData = useAppSelector((state) => state.updatedProduct);
    const [chipStatus, setChipStatus] = useState(status);
    const [openList, setOpenList] = useState(false);
    const { index, parentIndex } = id;

    const handleChipStatus = async (clickedStatus) => {
        if (updateAction) {
            updateAction({ index, parentIndex, status: clickedStatus });
            if (!edition) {
                await updateProduct(updateData);
            }
        }
        setChipStatus(clickedStatus);
    };

    useEffect(() => {
        setChipStatus(status);
    }, [status]);

    return (
        <div
            style={{
                cursor: "pointer",
                position: "relative",
                width: "fit-content",
            }}
            onClick={() => setOpenList((prevState) => !prevState)}
        >
            <StatusLabel status={chipStatus} openList={openList} dropdown />
            <div
                style={{
                    width: "11rem",
                    height: openList ? "18rem" : 0,
                    position: "absolute",
                    top: 35,
                    left: -10,
                    zIndex: 20,
                    backgroundColor: "#E8E8E8",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.075)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "1rem",
                    transition: "all 0.6s ease",
                    overflow: "hidden",
                    paddingLeft: 10,
                }}
            >
                {states.map((item) => (
                    <StatusLabel
                        key={item}
                        status={item}
                        setChipStatus={handleChipStatus}
                    />
                ))}
            </div>
        </div>
    );
};

export default StateOptions;
