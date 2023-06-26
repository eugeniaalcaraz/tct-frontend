import React, { useState } from "react";
import { NewProductContainer } from "./HeaderStyles";
import { FilterButton } from "./HeaderStyles";
import { useIconsContext } from "@components/hooks";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setEdition } from "@/state/features/product";

const ProductHeader = () => {
    const { edition } = useAppSelector((state) => state.product);
    const { icons } = useIconsContext();
    const dispatch = useAppDispatch();

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
                type={edition ? "submit" : "button"}
                color="primary"
                form="product-form"
                onClick={() => dispatch(setEdition(!edition))}
            >
                {edition ? "Guardar" : "Editar"}
            </FilterButton>
        </NewProductContainer>
    );
};

export default ProductHeader;
