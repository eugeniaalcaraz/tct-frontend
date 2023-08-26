import React, { useState } from "react";
import { NewProductContainer } from "./HeaderStyles";
import { FilterButton } from "./HeaderStyles";
import { useIconsContext } from "@components/hooks";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setEdition } from "@/state/features/product";
import { Loader } from "../loader";
import { updateProduct } from "@/services/UpdateProduct";

const ProductHeader = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { edition } = useAppSelector((state) => state.product);
    const updatedData = useAppSelector((state) => state.updatedProduct);
    const { icons } = useIconsContext();
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        setIsLoading(true);
        if (!edition) {
            dispatch(setEdition(true));
        } else {
            await updateProduct(updatedData);
            dispatch(setEdition(false));
        }
        setIsLoading(false);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <NewProductContainer>
            {!edition && (
                <FilterButton
                    variant="outlined"
                    type={"button"}
                    color="primary"
                    style={{ minWidth: "fit-content" }}
                    onClick={handlePrint}
                >
                    {icons["download"]}
                </FilterButton>
            )}

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
