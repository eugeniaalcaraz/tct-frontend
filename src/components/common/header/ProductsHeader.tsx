import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { FilterButton, ActionsButtons } from "./HeaderStyles";

import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { toggleFilters } from "@/state/features";
import {
    getCodeById,
    getCodeByName,
    getSeasonById,
    handleInputNumber,
} from "@/utils";
import { setFilterData } from "@/state/features/product";
import { useIconsContext } from "@components/hooks";
import { ProductHeaders } from "@/types";
import { exportToExcel } from "@/utils";
import dayjs from "dayjs";

const ProductsHeader = () => {
    const { product, filteredData, tipologies } = useAppSelector(
        (state) => state.product
    );
    const {
        allSeasons,
        supplier,
        managementUnit,
        tipology,
        fabrics,
        brands,
        industries,
        concepts,
        lines,
        bodyFit,
        seasons,
    } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const { icons } = useIconsContext();

    const handleChange = (e) => {
        filterByValue(e.target.value);
    };

    const filterByValue = async (query: string) => {
        if (query === "") {
            dispatch(setFilterData(null));
        } else {
            if (product) {
                const filteredData = product.filter((p) =>
                    Object.keys(p).some(() =>
                        String(p["productNumber"]).includes(query)
                    )
                );
                dispatch(setFilterData(filteredData));
            }
        }
    };

    const headerValues = Object.entries(ProductHeaders);

    headerValues.shift();

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
            row[ProductHeaders.Picture] = product?.pic;
            row[ProductHeaders.Code] = `${getCodeByName(
                product?.brand,
                brands
            )}${getCodeById(product?.idSeason, seasons)}${getCodeById(
                product?.idTipology,
                tipologies
            )}${product?.productNumber}`;
            row[ProductHeaders.Name] = product?.name;
            row[ProductHeaders.Season] = `${getSeasonById(
                product?.idSeason,
                allSeasons
            )}`;
            row[ProductHeaders.Supplier] = product?.supplier;
            row[ProductHeaders.ShipmentDate] = dayjs(
                product?.shippingDate
            ).format("YYYY-MM-DD");
            row[ProductHeaders.Concept] = product?.concept;
            row[ProductHeaders.Line] = product?.line;
            row[ProductHeaders.Unit] = product?.managmentUnit;
            row[ProductHeaders.Category] = product?.industry;
            row[ProductHeaders.Tipology] = product?.tipology;
            row[ProductHeaders.BodyFit] = product?.bodyFit;
            row[ProductHeaders.Composition] =
                product?.fabricData[0]?.Description;
            row[ProductHeaders.TotalQuanity] = product?.quantity;
            row[ProductHeaders.Buying] = product?.cost;
            row[ProductHeaders.SellingUy] = product?.costInStore;
            row[ProductHeaders.DepositDate] = dayjs(
                product?.warehouseEntryDate
            ).format("YYYY-MM-DD");
            row[ProductHeaders.StoreDate] = dayjs(product?.entryDate).format(
                "YYYY-MM-DD"
            );
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
