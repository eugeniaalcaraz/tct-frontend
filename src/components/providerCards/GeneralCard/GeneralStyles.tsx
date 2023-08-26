import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "3.5rem",
    "&& > .MuiTextField-root": {
        width: "calc(50% - 0.5rem)",
    },
    "&& > .MuiFormControl-root": {
        width: "calc(50% - 0.5rem)",
    },
}) as typeof Box;