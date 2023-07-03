import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)({
    display: "flex",
    justifyContent: "center",
    height: "90%",
    alignItems: "flex-start",
    gap: "2rem",

    "& > p": {
        fontWeight: 600,
        fontSize: "6.4rem",
        lineHeight: "8.7rem",
        color: "#314C95",
        flex: 1,
    },
}) as typeof Box;

export const Values = styled(Box)({
    display: "flex",
    flexDirection: "column",
    fontSize: "1.4rem",
    letterSpacing: "0.15rem",
    justifyContent: "flex-start",
    width: "25%",
    gap: "3rem",
}) as typeof Box;
