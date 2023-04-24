import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.5rem",

    "&& > .label, && > .packs > .label": {
        width: "100%",
        fontWeight: 400,
        fontSize: "1.4rem",
        lineHeight: "1.9rem",
        height: "1.9rem",
        marginBottom: "1rem",
    },

    "&& > .sizes": {
        width: "100%",
        display: "flex",
        marginBottom: "2rem",
        paddingTop: "1rem",
        justifyContent: "space-between",

        "& > .sizesBoxes": {
            display: "flex",
            gap: "0.8rem",
        },

        "& > button": {
            fontWeight: 600,
            fontSize: "1.3rem",
            lineHeight: "1.8rem",
            letterSpacing: "0.15em",
            height: "calc(100% - 1rem)",
            maxHeight: "3.5rem",
        },
    },

    "&& > .sizes > .sizesBoxes > span": {
        width: 0,
        overflow: "hidden",
        transition: "all 0.8s ease",

        "& > div": {
            width: "inherit",
            overflow: "inherit",
        },
    },

    "&& > .sizes > .sizesBoxes > .visible": {
        width: "5rem",
        overflow: "inherit",
    },

    "&& > .sizes > .sizesBoxes > .hidden": {
        width: "0",
        overflow: "hidden",
    },

    "&& > .sizesWrapper": {
        paddingTop: "0.5rem",
        height: "fit-content",
        flex: 0,
        width: 0,
        maxWidth: 0,
        overflow: "hidden",
        transition: "all 0.8s ease",

        "& > div": {
            width: "inherit",
            overflow: "inherit",
        },
    },

    "&& > .addSize": {
        width: "100%",
        maxWidth: "20rem",
        flex: 1,
        overflow: "initial",
    },

    "&& > .packs": {
        margin: "2rem 0 1.5rem ",
        width: "100%",
        display: "flex",
        flexDirection: "column",

        "& > div": {
            width: "20px",
        },
    },

    "&& > label > span": {
        fontSize: "1.3rem",
    },
}) as typeof Box;
