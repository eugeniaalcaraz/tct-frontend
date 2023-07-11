import { styled } from "@mui/material/styles";
import { Box, TableRow } from "@mui/material";

export const Container = styled(Box)({
    width: "100%",
    height: "fit-content",
    padding: "6rem 4rem",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E8E8E8",
    h1: {
        fontSize: "32px",
        fontWeight: "700",
        lineHeight: "44px",
        textAlign: "left",
    },
    "&& > div:nth-of-type(2)": {
        padding: "5rem 0 4rem 0",
    },
}) as typeof Box;

export const Content = styled(Box)({
    width: "100%",
    "&& > form": {
        width: "100%",
        padding: "40px 0",
    },
    "&& .item": {
        flexGrow: 1,
    },
    h3: {
        fontSize: "13px",
        fontWeight: "600",
        lineHeight: "18px",
    },
}) as typeof Box;

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderRadius: "20px ",

    "& > td, & > th": {
        border: 0,
        borderBottom: "0.5px solid",
        borderColor: theme.palette.secondary.main,
        backgroundColor: "#E8E8E8",
        height: "6.4rem",
    },

    "& >  th > img": {
        width: "4rem",
        height: "auto",
        objectFit: "cover",
        borderRadius: "50%",
    },
}));
