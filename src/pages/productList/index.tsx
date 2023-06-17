import React from "react";
import { Container } from "./ProductListStyles";
import { ProductTable, Footer } from "@/components";
import { useAppSelector } from "@/state/app/hooks";
import { ProductHeaders } from "@/types";
import { exportToExcel } from "@/utils/exportToExcel";

const ProductList = () => {
    const { product, filteredData } = useAppSelector((state) => state.product);

    const headers = Object.entries(ProductHeaders);

    const ticketsList = [headers.map(([_, value]) => value)];

    const handleDownload = async () => {
        let products;

        if (filteredData && filteredData.length > 0) {
            products = filteredData;
        } else if (product) {
            products = product;
        } else {
            products([]);
        }

        products.forEach((ticket) => {
            ticketsList.push([
                //All needed data, separated with comas
            ]);
        });
        exportToExcel("productList.xls", ticketsList);
    };

    return (
        <Container>
            <button onClick={handleDownload}>download</button>
            <ProductTable />
            <Footer />
        </Container>
    );
};

export { ProductList };
