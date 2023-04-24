import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)({
    zIndex: 10,
    padding: "1%",
    width: "calc(100% - 8.5%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.8s ease",
}) as typeof Box;
