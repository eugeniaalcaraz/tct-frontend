import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Paper)({
    width: "100%",
    height: "100%",
    "&& > div:nth-of-type(2)": {
        padding: "3rem 1rem",
    },
}) as typeof Paper;

export const HeaderContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&& > h2": {
        textTransform: "uppercase",
    },
}) as typeof Box;
