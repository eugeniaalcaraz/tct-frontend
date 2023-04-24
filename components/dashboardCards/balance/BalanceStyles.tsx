import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
}) as typeof Box;

export const State = styled(Box)(({ theme, className }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "3rem",
    height: "25%",
    borderRadius: "3px",
    backgroundColor:
        className === "Critical"
            ? theme.palette.error.light
            : className === "Attention"
            ? theme.palette.warning.light
            : theme.palette.secondary.light,
    "&& > p": {
        fontSize: "1.3rem",
        lineHeight: "1.8rem",
        letterSpacing: "0.15rem",
    },
}));
