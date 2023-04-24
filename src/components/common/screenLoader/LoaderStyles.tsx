import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)({
    "&& > .overlay": {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(147, 148, 150, 0.3)",
        opacity: 0,
        cursor: "auto",
        zIndex: "-1",
    },

    "&& > .modal": {
        width: "37%",
        maxWidth: "47.6rem",
        height: "26rem",
        opacity: 0,
        cursor: "auto",
        zIndex: "-1",
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translate(-50%, -50%)",
        transition: "all 0.4s ease",
    },

    "&& > .open": {
        position: "fixed",
        zIndex: 15,
        animation: "opacity 1s forwards",

        "@keyframes opacity": {
            "96% , 100%": {
                opacity: 1,
            },
        },
    },
}) as typeof Box;
