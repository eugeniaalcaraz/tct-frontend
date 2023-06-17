import React from "react";
import { Container } from "./ProductListStyles";
import { ProductTable, Footer } from "@/components";
import { useAppSelector } from "@/state/app/hooks";
import { ProductHeaders } from "@/types";
import { exportToExcel } from "@/utils";

const ProductList = () => {
    const { product, filteredData } = useAppSelector((state) => state.product);

    const headers = Object.entries(ProductHeaders);

    const productsList = [headers.map(([, value]) => value)];

    const handleDownload = async () => {
        let products;

        if (filteredData && filteredData.length > 0) {
            products = filteredData;
        } else if (product) {
            products = product;
        } else {
            products([]);
        }

        products.forEach((product) => {
            productsList.push([
                product?.pictures[0],
                //product?.code, TODO - No lo encontre
                product?.name,
                `${product?.idSeason} ${product?.year}`,
                product?.idSupplier,
                String(
                    product?.Fabrics.map((fabric) => fabric?.shippingDate) &&
                        "-"
                ), //TODO - En un lugar de la doc encontre el array "Fabrics" no se si eso se mantiene o no
                product?.idConcept,
                product?.idLine,
                //product?.idUnit, TODO no lo encontre
                product?.idIndustry, // TODO creo que esto es = a "Rubro"
                product?.idTipology,
                product?.idBodyFit,
                String(product?.combos[0].map((fabric) => fabric.composition)), //TODO - En un lugar de la doc encontre el array "combos" no se si eso se mantiene o no
                product?.quantity,
                //product?.margin, TODO no lo encontre
                product?.cost,
                product?.costInStore,
                //product?.costInStore * valorConversion, TODO - no lo encontre
                product?.warehouseEntryDate,
                product?.entryDate,
            ]);
        });
        exportToExcel("productList.xls", productsList);
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
