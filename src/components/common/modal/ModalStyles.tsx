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
        transform: "translate(-50%, -50%)",
        transition: "all 0.4s ease",

        "& > .iconWrapper": {
            position: "absolute",
            top: "2rem",
            right: "2rem",
            cursor: "pointer",

            "& > svg": {
                width: "1.2rem",
                height: "1.2rem",
                "& > path": {
                    stroke: "#000",
                },
            },
        },

        "& > div": {
            padding: "2.8rem",

            "& > div": {
                marginBottom: "1.8rem",
                "& > h2": {
                    fontSize: "1.6rem",
                    fontWeigth: 700,
                },
            },
        },

        "& > div > .modalContent": {
            fontSize: "1.4rem",
            display: "flex",
            flexDirection: "column",
            gap: "2.2rem",

            "& > .actions": {
                display: "flex",
                gap: "0.8rem",
                justifyContent: "flex-end",
            },
        },
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
