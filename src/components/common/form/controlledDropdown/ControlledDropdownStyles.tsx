import { styled } from "@mui/material/styles";
import { FormHelperText } from "@mui/material";

export const HelperText = styled(FormHelperText)(({ theme }) => ({
    margin: 0,
    paddingTop: "0.5rem",
    paddingLeft: "0.5rem",
    color: theme.palette.error.main,
    height: 0,
    overflow: "hidden",
    transition: "all 0.8s ease",

    "&&.error": {
        height: "2.1rem",
    },

    "&&": {
        fontSize: "1rem",
    },
})) as typeof FormHelperText;
