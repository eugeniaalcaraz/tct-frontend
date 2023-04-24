import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Page = styled(Box)({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
}) as typeof Box;

export const Container = styled(Box)(({ theme }) => ({
    width: "100%",
    maxWidth: 1440,
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    transition: "all 0.8s ease",
    position: "relative",
    padding: "3%",
    backgroundColor: theme.palette.background.default,
})) as typeof Box;

export const Overlay = styled(Box)({
    zIndex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
}) as typeof Box;
