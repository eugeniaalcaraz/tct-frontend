import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.8rem",
    marginBottom: "3.5rem",

    "&& > .files": {
        flex: 1,
        maxHeight: "3.5rem",
        letterSpacing: "0.15em",
        fontSize: "1rem",
    },

    "&& > .preview": {
        width: "100%",
        fontSize: "1.2rem",
    },
    "&& > .previewImages": {
        height: 0,
        overflow: "hidden",
        width: "100%",
        display: "flex",
        gap: "0.8rem",
        maxWidth: "47rem",
        transition: "all 0.8s ease",
        position: "relative",

        "& > img": {
            minWidth: "6rem",
            height: "rem",
            objectFit: "cover",
            opacity: 0,
            animation: "opacity 1s forwards",

            "@keyframes opacity": {
                "96% , 100%": {
                    opacity: 1,
                },
            },
        },
    },
    "&& > .grow": {
        height: "6.2rem",
    },
    "& > .more": {
        height: 0,
        overflow: "hidden",
        width: "100%",
        fontSize: "1rem",
        fontWeight: "600",
    },
    "& > .growMore": {
        height: "1.2rem",
    },
}) as typeof Box;
