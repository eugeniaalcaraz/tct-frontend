import { Box, Stack } from "@mui/material";
import React, { FC } from "react";
import { StyledComboItem } from "./StyledComboItem";
import { StatusLabel } from "../stateLabel";

type ComboItemProps = {
    combo: number;
    color: string;
    status: string;
    name?: string;
    colorCount?: number;
};

export const ComboItem: FC<ComboItemProps> = ({
    combo,
    color,
    status,
    name,
    colorCount,
}) => {
    return (
        <StyledComboItem>
            <Stack
                sx={{
                    alignItems: "center",
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

                    <Stack gap={"8px"} style={{ alignItems: "center" }}>
                        <StatusLabel status={"pendiente"} />
                        {name && <div>name colorCount</div>}
                    </Stack>
                </Stack>
            </Stack>
        </StyledComboItem>
    );
};
