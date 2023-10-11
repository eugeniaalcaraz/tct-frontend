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
import { setData } from "@/state/features/supplier";
import { Pages, Product, ProductHeaders, SupplierHeaders, SupplierHeadersArray } from "@/types";
import { isEmpty } from "@aws-amplify/core";
import { EmptyState, ScreenLoader } from "..";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getSupplier, getSupplierList } from "@/services/ProviderRequests";

const SupplierTable = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { data, filteredData } = useAppSelector((state) => state.supplier);
    const [emptyProduct, setEmptyProduct] = useState(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const filters = useAppSelector((state) => state.filters);
    
    const {
        mutateAsync: getSupplierAsync,
        isLoading: productsLoading,
        isError: productsError,
    } = useMutation(() => getSupplierList("1"));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getNewListData = async () => {
        dispatch(
            setData(
                await getSupplierAsync()
            )
        );
    };

    const loadTableData = () => {
        if (filteredData) {
            filteredData.length > 0
                ? setTableData(filteredData)
                : setTableData([]);
        } else if (data) {
            setTableData(data);
        } else {
            setTableData([]);
        }
    };

    useEffect(() => {
        getNewListData();
    }, [
        // Filters
    ]);

    useEffect(() => {
        if (
            isEmpty(filters) &&
            data?.length === 0 &&
            filteredData?.length === 0
        ) {
            setEmptyProduct(true);
        } else {
            setEmptyProduct(false);
        }
    }, [filters, data, filteredData]);

    useEffect(() => loadTableData(), [data, filteredData]);

    // useEffect(() => {
    //     productsError && navigate(urlFormat(Pages.ServerError));
    // }, [productsError]);

    useEffect(() => {
       getSupplierList("1").then((res) => {
        console.log(res)
       })
    }, [])

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
                            // minWidth: "2500px",
                        }}
                    >
                        <TableHead>
                            <TableRow
                                sx={{
                                    "& > td": {
                                        backgroundColor: "#E8E8E8",
                                    },
                                    display: "flex",
                                }}
                            >
                                {SupplierHeadersArray.map(({code, title, width}) => (
                                    <TableCell 
                                    key={uuid()} 
                                    // Width to avatar
                                    sx={{
                                        width: width,
                                        display: "flex",
                                        justifyContent: "left",
                                    } }
                                    >{title}</TableCell>
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

export { SupplierTable };
