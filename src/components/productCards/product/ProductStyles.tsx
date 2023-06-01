import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "3.5rem",

    "&& > div": {
        width: "calc(50% - 0.5rem)",
    },
    "&& > div:nth-of-type(2), && > div:nth-of-type(3)": {
        width: "calc(24% - 0.5rem)",
        minWidth: "auto",
    },
    "&& > .MuiTextField-root": {
        width: "100%",
    },
    "&& > div .MuiTextField-root": { width: "100%" },
    "&& > .MuiFormControlLabel-root-checkbox": {
        width: "100",
    },

    ".Mui-readOnly": {
        height: "38px",
    },
}) as typeof Box;
