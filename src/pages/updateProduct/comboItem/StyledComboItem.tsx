import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const StyledComboItem = styled(Stack)({
    width: "100%",
    alignItems: "center",
    "&& .title": {
        textAlign: "initial",
        width: "100%",
        marginBottom: "10px",
    },
    "&& .colorBox": {
        height: "40px",
        width: "64px",
        backgroundColor: "grey",
    },
}) as typeof Stack;
