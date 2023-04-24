import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    paddingTop: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",

    "&& > div:nth-of-type(2)": {
        paddingTop: "5rem",
    },
}) as typeof Box;
