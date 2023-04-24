import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    alignItems: "space-between",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",

    "&& > .input": {
        flex: 1,
        maxHeight: "3.5rem",
        fontSize: "1.3rem",
        transition: "all 0.8s ease",
    },

    "&&.error > .input": {
        maxHeight: "6rem",
    },

    "&& > .margin": {
        width: "100%",
        textAlign: "left",
        fontWeight: 600,
        fontSize: "1.8rem",
        lineHeight: "2.5rem",
        height: "2.5rem",
        marginBottom: "0",
        marginTop: "2.5rem",
    },
}) as typeof Box;
