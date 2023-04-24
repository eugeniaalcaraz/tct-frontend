import React from "react";
import { Container } from "./ProductListStyles";
import { ProductTable, Footer } from "@/components";

const ProductList = () => {
    return (
        <Container>
            <ProductTable />
            <Footer />
        </Container>
    );
};

export { ProductList };
