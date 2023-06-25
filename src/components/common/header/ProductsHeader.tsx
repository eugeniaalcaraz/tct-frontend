import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { FilterButton, ActionsButtons } from "./HeaderStyles";

import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { toggleFilters } from "@/state/features";
import { handleInputNumber } from "@/utils";
import { setFilterData } from "@/state/features/product";
import { useIconsContext } from "@components/hooks";
import { ProductHeaders } from "@/types";
import { exportToExcel } from "@/utils";

const ProductsHeader = () => {
    const { product, filteredData } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const { icons } = useIconsContext();

    const handleChange = (e) => {
        filterByValue(e.target.value);
    };

    const filterByValue = async (query: string) => {
        if (query === "") {
            dispatch(setFilterData([]));
        } else {
            if (product) {
                const filteredData = product.filter((p) =>
                    Object.keys(p).some(() =>
                        String(p["IdProduct"]).includes(query)
                    )
                );
                dispatch(setFilterData(filteredData));
            }
        }
    };

    const headerValues = Object.entries(ProductHeaders);

    const headers = headerValues.map(([, value]) => value);

    const rowHeaders = headers.map((header) => ({
        header,
        key: header,
        width: 14,
    }));
    const rows: unknown[] = [];

    const handleDownload = async () => {
        let products;

        if (filteredData && filteredData.length > 0) {
            products = filteredData;
        } else if (product) {
            products = product;
        } else {
            products = [];
        }

        products.forEach((product) => {
            const row = {};
            row[ProductHeaders.Picture] = product?.pictures[0];
            //row[ProductHeaders.Code] = product?.code, TODO - No lo encontre;
            row[ProductHeaders.Name] = product?.name;
            row[
                ProductHeaders.Season
            ] = `${product?.idSeason} ${product?.year}`;
            row[ProductHeaders.Supplier] = product?.idSupplier;
            //row[ProductHeaders.ShipmentDate] = String(
            //         product?.Fabrics.map((fabric) => fabric?.shippingDate) &&
            //             "-"
            //     ), //TODO - En un lugar de la doc encontre el array "Fabrics" no se si eso se mantiene o no;
            row[ProductHeaders.Concept] = product?.idConcept;
            row[ProductHeaders.Line] = product?.idLine;
            //row[ProductHeaders.Unit] =   //product?.idUnit, TODO no lo encontre;
            row[ProductHeaders.Category] = product?.idIndustry; // TODO creo que esto es = a "Rubro"
            row[ProductHeaders.Tipology] = product?.idTipology;
            row[ProductHeaders.BodyFit] = product?.idBodyFit;
            //row[ProductHeaders.Composition] = String(product?.combos[0].map((fabric) => fabric.composition)), //TODO - En un lugar de la doc encontre el array "combos" no se si eso se mantiene o no
            row[ProductHeaders.TotalQuanity] = product?.quantity;
            row[ProductHeaders.Buying] = product?.cost;
            row[ProductHeaders.Selling] = product?.costInStore;
            //row[ProductHeaders.SellingUy] = //product?.costInStore * valorConversion, TODO - no lo encontre
            row[ProductHeaders.DepositDate] = product?.warehouseEntryDate;
            row[ProductHeaders.StoreDate] = product?.entryDate;
            rows.push(row);
        });
        exportToExcel(rowHeaders, rows);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "calc(100% - 6rem)",
            }}
        >
            <TextField
                placeholder="Busca tu orden"
                id="outlined-start-adornment"
                sx={{
                    width: "30rem",
                    height: "3.5rem",
                    "& > *": { height: "100%" },
                    "& > div > input": { fontSize: "1.4rem" },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {icons["search"]}
                        </InputAdornment>
                    ),
                }}
                onKeyDown={(e) => handleInputNumber(e)}
                onChange={handleChange}
            />
            <ActionsButtons>
                <FilterButton
                    variant="outlined"
                    type={"button"}
                    color="primary"
                    style={{ minWidth: "fit-content" }}
                    onClick={handleDownload}
                >
                    {icons["download"]}
                </FilterButton>
                <FilterButton
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={() => dispatch(toggleFilters())}
                >
                    {icons["filter"]} Filtros
                </FilterButton>
            </ActionsButtons>
        </Box>
    );
};

export default ProductsHeader;
