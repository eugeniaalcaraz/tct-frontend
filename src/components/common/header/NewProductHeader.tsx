import React from "react";
import { Tooltip } from "@mui/material";
import { NewProductContainer } from "./HeaderStyles";
import { FilterButton } from "./HeaderStyles";

const NewProductHeader = () => {
    return (
        <NewProductContainer>
            <Tooltip title="Proximamente 😉" placement="left" arrow>
                <FilterButton variant="outlined" type="button" color="primary">
                    Vista Previa
                </FilterButton>
            </Tooltip>
            <FilterButton
                variant="contained"
                type="submit"
                color="primary"
                form="new-product-form"
            >
                Guardar
            </FilterButton>
        </NewProductContainer>
    );
};

export default NewProductHeader;
