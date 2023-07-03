import { Box, Stack } from "@mui/material";
import React, { FC } from "react";
import { StyledComboItem } from "./StyledComboItem";
import { StatusLabel } from "../stateLabel";
import StateOptions from "../stateLabel/StateOptions";
import dayjs from "dayjs";

type ComboItemProps = {
    combo: number;
    color?: string;
    status: string;
    name?: string;
    colorCount?: number;
    date?: Date | string;
    id: { index: number; parentIndex?: number; item: string };
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
    return (
        <StyledComboItem>
            <Stack
                sx={{
                    alignItems: "flex-start",
                    width: "145px",
                    justifyContent: "center",
                }}
            >
                <div className="title">Combo {combo}</div>
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
