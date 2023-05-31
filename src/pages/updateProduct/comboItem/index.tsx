import { Box, Stack } from "@mui/material";
import React from "react";
import { StyledComboItem } from "./StyledComboItem";

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
                    <div>
                        <div>state</div>
                        <div>{"{fechaEstado}"}</div>
                    </div>
                </Stack>
            </Stack>
        </StyledComboItem>
    );
};
