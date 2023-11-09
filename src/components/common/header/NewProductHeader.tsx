import React from "react";
import { NewProductContainer } from "./HeaderStyles";
import { FilterButton } from "./HeaderStyles";

const NewProductHeader = ({formId}: {formId:string}) => {
    return (
        <NewProductContainer>
            <FilterButton
                variant="contained"
                type="submit"
                color="primary"
                form={formId}
            >
                Guardar
            </FilterButton>
        </NewProductContainer>
    );
};

export default NewProductHeader;
