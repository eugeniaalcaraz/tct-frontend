import React from "react";
import { NewProductContainer } from "./HeaderStyles";
import { FilterButton } from "./HeaderStyles";

const NewProductHeader = () => {
    return (
        <NewProductContainer>
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
