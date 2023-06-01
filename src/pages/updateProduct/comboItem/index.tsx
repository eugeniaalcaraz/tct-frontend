import { Box, Stack } from "@mui/material";
import React from "react";
import { StyledComboItem } from "./StyledComboItem";
import { StatusLabel } from "../stateLabel";

export const ComboItem = () => {
    return (
        <StyledComboItem>
            <Stack
                sx={{
                    alignItems: "center",
                    width: "145px",
                    justifyContent: "center",
                }}
            >
                <div className="title">Combo 1</div>
                <Stack
                    direction={"row"}
                    gap={"16px"}
                    sx={{ alignItems: "center" }}
                >
                    <div className="colorBox">Box</div>
                    <Stack gap={"8px"} style={{ alignItems: "center" }}>
                        <StatusLabel status={"pendiente"} />
                        <div>{"{fechaEstado}"}</div>
                    </Stack>
                </Stack>
            </Stack>
        </StyledComboItem>
    );
};
