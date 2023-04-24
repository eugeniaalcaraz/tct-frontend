import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const Container = styled(Box)({
    zIndex: 10,
    position: "fixed",
    left: "4%",
    top: "3%",
    padding: "1%",
    height: "60px",
    width: "calc(100% - 8.5%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: "2rem",
    overflow: "hidden",
    transition: "all 0.8s ease",
    borderRadius: "4px",

    "&& > #menu": {
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        zIndex: 11,
    },
}) as typeof Box;

export const FilterButton = styled(Button)({
    textTransform: "initial",
    fontSize: "1.4rem",
    minWidth: "10rem",
    height: "3.5rem",
    display: "flex",
    justifyContent: "space-around",
}) as typeof Button;

export const Filters = styled(Box)({
    padding: "1%",
    height: "60px",
    width: "calc(100% - 8.5%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "2rem",
    overflow: "hidden",
    transition: "all 0.8s ease",
    borderRadius: "4px",
}) as typeof Box;

export const DashboardContainer = styled(Box)({
    display: "flex",
    gap: "2rem",
    transition: "all 0.8s ease",
}) as typeof Box;

export const NewProductContainer = styled(Box)({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1.5rem",
    width: "calc(100% - 6rem)",
    transition: "all 0.8s ease",
}) as typeof Box;
