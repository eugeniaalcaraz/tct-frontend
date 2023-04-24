import { styled } from "@mui/material/styles";
import { Box, Link } from "@mui/material";

export const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    minWidth: 250,
    maxWidth: 300,
    height: "70vh",

    "& > form > div": {
        marginBottom: "3.5rem",
    },

    "& > form > button": {
        margin: "2rem 0",
        padding: "1rem",
        height: "3.5rem",
        minHeight: "3.5rem",
    },

    "& > h1": {
        textAlign: "center",
        marginBottom: "5rem",
    },

    "& > .open": {
        height: "3.5rem",
    },
}) as typeof Box;

export const Messages = styled(Box)(({ theme }) => ({
    marginBottom: "1.5rem",
    textAlign: "center",
    overflow: "hidden",
    height: "0",
    color: theme.palette.error.main,
    transition: "all 0.8s ease",
})) as typeof Box;

export const ForgotPassword = styled(Link)(({ theme }) => ({
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    transition: "all 0.7s ease",
    "& > p": {
        color: theme.palette.primary.main,
        transition: "all 0.7s ease",
    },
    "& > p:hover": {
        color: theme.palette.secondary.main,
    },
})) as typeof Link;
