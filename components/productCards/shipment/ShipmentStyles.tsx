import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "3.5rem",

    "&& > .dropdown, && > .input, && > div": {
        width: "calc(50% - 0.5rem)",
    },

    "&& > div, && > div > * ": {
        maxHeight: "3.5rem",
        fontSize: "1.3rem",
        transition: "all 0.8s ease",
    },
    "&&.error > div, && > div > .dropdown:last-of-type ": { maxHeight: "6rem" },

    "&& > .add": { width: "100%" },

    "&& > .add > button": {
        fontWeight: 600,
        fontSize: "1.3rem",
        lineHeight: "1.8rem",
        letterSpacing: "0.15em",
        maxHeight: "3.5rem",
        margin: "1.5rem 0",
    },
}) as typeof Box;
