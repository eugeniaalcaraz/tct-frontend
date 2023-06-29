import { styled } from "@mui/material/styles";
import { TableRow, Box, Paper } from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderRadius: "20px ",

    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.primary.main,
    },

    "& > td, & > th": {
        border: 0,
        borderBottom: "0.5px solid",
        borderColor: theme.palette.secondary.light,
        backgroundColor: "#E8E8E8",
        width: "fit-content",
    },

    "& >  th > img": {
        width: "4rem",
        height: "auto",
        objectFit: "cover",
        borderRadius: "50%",
    },
}));

export const Container = styled(Box)({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: "2rem",
    transition: "all 0.8s ease",

    "&& > div > div > .emptyState": {
        width: "100%",
        height: "80%",
    },
}) as typeof Box;

export const FiltersContainer = styled(Paper)(({ className }) => ({
    display: "flex",
    gap: "1.5rem",
    width: "100%",
    height: className === "open" ? "auto" : "0%",
    maxHeight: className === "open" ? "300px" : 0,
    padding: className === "open" ? "1.8rem" : 0,
    flexWrap: "wrap",
    overflow: "hidden",
    transition: "max-height 0.8s ease",

    "&& > button": {
        maxHeight: "3rem",
        textTransform: "capitalize",
        fontSize: "1.3rem",
    },

    "&& > .datePicker, && > .datePicker > * ": {
        maxHeight: "3.5rem",
        fontSize: "1.3rem",
    },

    "&& > .datePicker": {
        position: "relative",
    },
}));

export const ChipsWrapper = styled(Box)(({ theme }) => ({
    height: "auto",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    transition: "all 0.8s ease",

    "&& > span": {
        display: "flex",
        alignItems: "stretch",
        gap: "0.8rem",
        background: theme.palette.secondary.main,
        color: theme.palette.common.white,
        fontSize: "1.3rem",
        padding: "0.5rem 1rem",
        borderRadius: "5px",

        "& > span": {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
        },
    },
}));
