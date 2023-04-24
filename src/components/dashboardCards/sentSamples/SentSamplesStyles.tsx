import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "90%",
    alignItems: "flex-start",
    gap: "2rem",

    "& > span": {
        marginTop: "1rem",
    },

    "& > span, & > ul": {
        fontSize: "1.4rem",
        letterSpacing: 0,
    },

    "& > ul > li": {
        listStyle: "none",
        marginBottom: "0.8rem",
    },
}) as typeof Box;
