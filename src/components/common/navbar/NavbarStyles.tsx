import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme, className }) => ({
    zIndex: 20,
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    filter: "drop-shadow( 2px 0px 5px rgba(0, 0, 0, 0.25))",
    backgroundColor: theme.palette.background.default,
    overflow: "hidden",
    transition: "all 0.8s ease",
    width: className === "open" ? "15%" : "0%",
    maxWidth: className === "open" ? "160px" : 0,

    "&& > ul": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2rem",
        width: "100%",
        padding: "2.8rem",

        "& > img": {
            alignSelf: "center",
            width: "4rem",
            marginBottom: "3rem",
        },
    },

    "&& > ul > a": {
        transition: "all 0.8s ease",
        letterSpacing: "0.15rem",
        width: "inherit",
        textAlign: "start",
        textTransform: "uppercase",
        fontSize: "1.3rem",
        textDecoration: "none",
        padding: "0.5rem",
        color: theme.palette.secondary.main,
        fontWeight: 400,

        "&:hover": {
            color: theme.palette.primary.main,
            fontWeight: 600,
        },
        "& > li": {
            listStyle: "none",
        },
    },
})) as typeof Box;

export const LogoutContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    transition: "color 0.8s ease",
    letterSpacing: "0.15rem",
    width: "fit-content",
    textAlign: "start",
    textTransform: "uppercase",
    fontSize: "1.1rem",
    textDecoration: "none",
    padding: "0.5rem",
    borderBottom: 0,
    color: theme.palette.secondary.main,
    fontWeight: 400,
    position: "absolute",
    bottom: "2.5rem",
    left: "3rem",
    cursor: "pointer",

    "&:hover": {
        color: theme.palette.primary.main,
        fontWeight: 600,
        "& > svg > path": {
            stroke: theme.palette.primary.main,
        },
    },
    "& > li": {
        listStyle: "none",
    },
    "& > svg": {
        width: "1.5rem",
    },
    "& > svg > path": {
        stroke: theme.palette.secondary.main,
        transition: "stoke 0.8s ease",
    },
})) as typeof Box;
