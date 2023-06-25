import React, { useState } from "react";
import { NewProductContainer } from "./HeaderStyles";
import { FilterButton } from "./HeaderStyles";
import { useIconsContext } from "@components/hooks";

const ProductHeader = () => {
    const [editMode, setEditMode] = useState(false);
    const { icons } = useIconsContext();
    return (
        <NewProductContainer>
            <FilterButton
                variant="outlined"
                type={"button"}
                color="primary"
                style={{ minWidth: "fit-content" }}
                //TODO onClick={() => !editMode && setEditMode(true)}
            >
                {icons["download"]}
            </FilterButton>

            <FilterButton
                variant="contained"
                type={editMode ? "submit" : "button"}
                color="primary"
                form="product-form"
                onClick={() => !editMode && setEditMode(true)}
            >
                {editMode ? "Guardar" : "Editar"}
            </FilterButton>
        </NewProductContainer>
    );
};

export default ProductHeader;
