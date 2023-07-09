import React, { useState } from "react";
import { NewProductContainer } from "./HeaderStyles";
import { FilterButton } from "./HeaderStyles";
import { useIconsContext } from "@components/hooks";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setEdition } from "@/state/features/product";
import { Loader } from "../loader";

const ProductHeader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { edition } = useAppSelector((state) => state.product);
    const { icons } = useIconsContext();
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        setIsLoading(true);
        if (!edition) {
            dispatch(setEdition(true));
        } else {
            //console.log(await UpdateProduct());
            dispatch(setEdition(false));
        }
        setIsLoading(false);
    };

    return (
        <NewProductContainer>
            <FilterButton
                variant="outlined"
                type={"button"}
                color="primary"
                style={{ minWidth: "fit-content" }}
            >
                {icons["download"]}
            </FilterButton>

            <FilterButton
                variant="contained"
                type={edition ? "submit" : "button"}
                color="primary"
                form="product-form"
                onClick={handleClick}
            >
                {isLoading ? <Loader /> : edition ? "Guardar" : "Editar"}
            </FilterButton>
        </NewProductContainer>
    );
};

export default ProductHeader;
