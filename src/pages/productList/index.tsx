import React from "react";
import { Container } from "./ProductListStyles";
import { ProductTable, Footer } from "@/components";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setEdition } from "@/state/features/product";

const ProductList = () => {
    const { edition } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    edition && dispatch(setEdition(false));
    return (
        <Container>
            <ProductTable />
            <Footer />
        </Container>
    );
};

export { ProductList };
