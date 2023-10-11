import React from "react";
import { Container } from "./SupplierListStyles";
import { SupplierTable, Footer } from "@/components";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setEdition } from "@/state/features/product";

const SupplierList = () => {
    const { edition } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    edition && dispatch(setEdition(false));
    return (
        <Container>
            <SupplierTable />
            <Footer />
        </Container>
    );
};

export { SupplierList };
