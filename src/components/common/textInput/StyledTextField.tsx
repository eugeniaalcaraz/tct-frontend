import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SyledTextField = styled(TextField)({
    width: "13rem",
    maxWidth: "100%",
    "&& > *": { fontSize: "1.3rem" },
    "&& > label": { textTransform: "capitalize" },
    "&& > p": {
        margin: 0,
        paddingTop: "0.5rem",
        paddingLeft: "0.5rem",
        height: 0,
        overflow: "hidden",
        fontSize: "1rem",
        transition: "all 0.8s ease",
    },
    "&&.error > p": {
        height: "2.1rem",
    },
}) as typeof TextField;
