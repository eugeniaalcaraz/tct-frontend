import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from "@mui/material";
import { getProducts } from "@/services/ProductRequests";
import { useAppSelector, useAppDispatch } from "@/state/app/hooks";

import Filters from "./Filters";
import FilterChips from "./FilterChips";
import { Row } from "./Row";

import { Container } from "./TableStyles";
import { filterUrlFormat, urlFormat } from "@/utils";
import { setData } from "@/state/features/product";
import { Pages, Product, ProductHeaders } from "@/types";
import { isEmpty } from "@aws-amplify/core";
import { EmptyState, ScreenLoader } from "..";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { product, filteredData } = useAppSelector((state) => state.product);
    const [emptyProduct, setEmptyProduct] = useState(false);
    const [tableData, setTableData] = useState<Product[]>([]);
    const {
        temporada,
        tipologia,
        calidad,
        embarque,
        fecha,
        marca,
        unidad,
        rubro,
        concepto,
        linea,
        fit,
        deposito,
        store,
        nombre,
        proveedor,
    } = useAppSelector((state) => state.filters);
    const filters = useAppSelector((state) => state.filters);
    const dispatch = useAppDispatch();
    const {
        mutateAsync: getProductsAsync,
        isLoading: productsLoading,
        isError: productsError,
    } = useMutation(getProducts);
    const navigate = useNavigate();
    const headerValues = Object.entries(ProductHeaders);

    const getNewListData = async () => {
        dispatch(
            setData(
                await getProductsAsync({
                    productName: filterUrlFormat(nombre),
                    idMerchant,
                    idSeason: filterUrlFormat(temporada),
                    idBrand: filterUrlFormat(marca),
                    idManagmentUnit: filterUrlFormat(unidad),
                    idIndustry: filterUrlFormat(rubro),
                    idTipology: filterUrlFormat(tipologia),
                    idConcept: filterUrlFormat(concepto),
                    idLine: filterUrlFormat(linea),
                    idBodyFit: filterUrlFormat(fit),
                    entryDate: filterUrlFormat(fecha),
                    warehouseEntryDate: filterUrlFormat(deposito),
                    storeDate: filterUrlFormat(store),
                    idShippingType: filterUrlFormat(embarque),
                    idFabric: filterUrlFormat(calidad),
                })
            )
        );
    };

    const loadTableData = () => {
        if (filteredData) {
            filteredData.length > 0
                ? setTableData(filteredData)
                : setTableData([]);
        } else if (product) {
            setTableData(product);
        } else {
            setTableData([]);
        }
    };

    useEffect(() => {
        getNewListData();
    }, [
        temporada,
        tipologia,
        calidad,
        embarque,
        fecha,
        marca,
        unidad,
        rubro,
        concepto,
        linea,
        fit,
        deposito,
        store,
        nombre,
        proveedor,
    ]);

    useEffect(() => {
        if (
            isEmpty(filters) &&
            product?.length === 0 &&
            filteredData?.length === 0
        ) {
            setEmptyProduct(true);
        } else {
            setEmptyProduct(false);
        }
    }, [filters, product, filteredData]);

    useEffect(() => loadTableData(), [product, filteredData]);

    // useEffect(() => {
    //     productsError && navigate(urlFormat(Pages.ServerError));
    // }, [productsError]);

    return (
        <Container>
            <Filters />
            {/* <FilterChips /> */}
            <Paper
                sx={{
                    width: "100%",
                    flex: 1,
                    overflow: "hidden",
                    backgroundColor: "#E8E8E8",
                }}
            >
                <TableContainer sx={{ height: "100%" }}>
                    <Table
                        stickyHeader
                        aria-label="collapsible table"
                        sx={{
                            borderCollapse: "collapse",
                            minWidth: "2500px",
                        }}
                    >
                        <TableHead>
                            <TableRow
                                sx={{
                                    "& > td": {
                                        backgroundColor: "#E8E8E8",
                                    },
                                }}
                            >
                                {headerValues.map(([, header]) => (
                                    <TableCell key={uuid()}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        {productsLoading ? (
                            <ScreenLoader loading={true} />
                        ) : tableData.length > 0 ? (
                            <TableBody>
                                {tableData.map((row) => (
                                    <Row key={uuid()} row={row} />
                                ))}
                            </TableBody>
                        ) : (
                            <></>
                        )}
                    </Table>
                    <Box className="emptyState">
                        {!productsLoading && tableData.length === 0 ? (
                            emptyProduct ? (
                                <EmptyState />
                            ) : (
                                <EmptyState search />
                            )
                        ) : (
                            <></>
                        )}
                    </Box>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export { ProductTable };
