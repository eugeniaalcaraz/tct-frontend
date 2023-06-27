import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "3rem",
}) as typeof Box;

export const DayContainer = styled(Box)({
    flex: 1,
    width: "100%",
    display: "flex",
    gap: "2.5rem",
    padding: "0 2rem",
    alignItems: "flex-start",
    maxHeight: "5.8rem",
    overflow: "hidden",
    position: "relative",

    "& > span:nth-of-type(1)": {
        display: "flex",
        flexDirection: "column",
        color: "#314C95",

        "& > span:nth-of-type(1)": {
            fontSize: "2rem",
            fontWeight: 600,
            textTransform: "capitalize",
            letterSpacing: "0.15rem",
        },
        "& > span:nth-of-type(2)": {
            fontSize: "1.4rem",
            fontWeight: 400,
        },
    },
    "& > span:nth-of-type(2)": {
        display: "flex",
        flexDirection: "column",
        fontSize: "1.2rem",
        color: "#314C95",

        "& > span": {
            fontSize: "1.2rem",
        },
    },
    "& > span:nth-of-type(3)": {
        "& >  .seeMore": {
            fontSize: "1rem",
            fontWeight: "600",
            textDecoration: "underline",
            position: "absolute",
            bottom: 0,
            right: 0,
            color: "#314C95",
        },
    },
}) as typeof Box;
