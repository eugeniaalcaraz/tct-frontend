import { Box, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { FC } from "react";
import { StyledComboItem } from "./StyledComboItem";
import { StatusLabel } from "../stateLabel";
import StateOptions from "../stateLabel/StateOptions";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setData, setTrimColors } from "@/state/features/updatedProduct";

type ComboItemProps = {
    combo: number;
    color?: string;
    status: string;
    name?: string;
    colorCount?: number;
    date?: Date | string;
    id: { index: number; parentIndex: number; item: string };
    deleteAction?: (...args) => void;
    updateAction?: (...args) => void;
};

export const ComboItem: FC<ComboItemProps> = ({
    combo,
    color,
    status,
    name,
    colorCount,
    date,
    id,
    deleteAction,
    updateAction,
}) => {
    const { edition } = useAppSelector((state) => state.product);
    const { avios } = useAppSelector((state) => state.updatedProduct);
    const dispatch = useAppDispatch();

    return (
        <StyledComboItem>
            <Stack
                sx={{
                    alignItems: "flex-start",
                    width: name ? "230px" : "145px",
                    justifyContent: "center",
                }}
            >
                <div className="title">
                    {name ? "Estampa" : "Color"} {combo}{" "}
                    {edition && (
                        <IconButton aria-label="delete" onClick={deleteAction}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
                <Stack
                    direction={"row"}
                    gap={"16px"}
                    sx={{ alignItems: "center" }}
                >
                    <div className="colorBox" style={{ background: color }} />
                    {name && (
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <span>{name}</span>
                            <span>{colorCount} colores</span>
                        </div>
                    )}
                    <Stack gap={"8px"} style={{ alignItems: "center" }}>
                        <StateOptions
                            id={id}
                            status={status}
                            updateAction={updateAction}
                        />
                        {date && <div>{dayjs(date).format("YYYY-MM-DD")}</div>}
                    </Stack>
                </Stack>
            </Stack>
        </StyledComboItem>
    );
};
