import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    paddingTop: "60px",
    display: "flex",
    flexDirection: "column",

    "&& > div:nth-of-type(2)": {
        padding: "5rem 0 4rem 0",
    },
}) as typeof Box;

export const Content = styled(Box)({
    "&& > form": {
        width: "100%",
        display: "flex",
        gap: "2rem",

        "&  > div": {
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
        },
        "& > :nth-of-type(1)": {
            width: "80%",
        },
        "& > :nth-of-type(2)": {
            width: "100%",
        },
    },
}) as typeof Box;

export const ModalButton = styled(Button)({
    textTransform: "initial",
    fontSize: "1.3rem",
    minWidth: "10rem",
    height: "3.2rem",
    display: "flex",
    justifyContent: "space-around",
}) as typeof Button;
