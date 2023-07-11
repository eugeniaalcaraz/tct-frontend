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
};

export const ComboItem: FC<ComboItemProps> = ({
    combo,
    color,
    status,
    name,
    colorCount,
    date,
    id,
}) => {
    const { edition } = useAppSelector((state) => state.product);
    const { avios } = useAppSelector((state) => state.updatedProduct);
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        const { index, parentIndex } = id;
        const newColorsArray = avios[parentIndex]?.colors?.slice(index + 1);
        console.log(avios[parentIndex]?.colors);
        console.log(newColorsArray);
        dispatch(setTrimColors({ parentIndex, colors: newColorsArray }));
    };

    return (
        <StyledComboItem>
            <Stack
                sx={{
                    alignItems: "flex-start",
                    width: "145px",
                    justifyContent: "center",
                }}
            >
                <div className="title">
                    Combo {combo}{" "}
                    {edition && (
                        <IconButton aria-label="delete" onClick={handleDelete}>
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
                        <div>
                            {name} - {colorCount}
                        </div>
                    )}
                    <Stack gap={"8px"} style={{ alignItems: "center" }}>
                        <StateOptions id={id} status={status} />
                        {date && <div>{dayjs(date).format("YYYY-MM-DD")}</div>}
                    </Stack>
                </Stack>
            </Stack>
        </StyledComboItem>
    );
};
