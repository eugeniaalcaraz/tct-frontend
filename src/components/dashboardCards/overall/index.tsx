import React, { Fragment, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { OverallHeaders } from "@/types";
import { useAppSelector } from "@/state/app/hooks";
import { formatNumber } from "@/utils";

const Overall = () => {
    const { overall } = useAppSelector((state) => state.dashboard);
    const headerValues = Object.entries(OverallHeaders);

    const initialValue = 0;
    const totalCost = overall?.reduce(
        (accumulator, { cost }) => accumulator + Number(cost),
        initialValue
    );
    const totalPcs = overall?.reduce(
        (accumulator, { quantity }) => accumulator + Number(quantity),
        initialValue
    );
    const totalSKUS = overall?.reduce(
        (accumulator, { comboColorCount, comboPrintCount }) =>
            accumulator + Number(comboColorCount) + Number(comboPrintCount),
        initialValue
    );

    const headers = headerValues.map(([, value]) => value);

    return (
        <TableContainer>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow sx={{ "& th": { border: 0 }, height: "4rem" }}>
                        {headers.map((header) => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {overall?.map(
                        ({
                            industryDescription,
                            quantity,
                            cost,
                            comboColorCount,
                            comboPrintCount,
                            tipologies,
                        }) => (
                            <Fragment key={uuid()}>
                                <TableRow
                                    sx={{
                                        "& td, & th": {
                                            border: 0,
                                        },
                                        "&:first-of-type td, &:first-of-type th":
                                            {
                                                fontWeight: 600,
                                            },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {industryDescription}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        $ {formatNumber(cost)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {formatNumber(quantity)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {formatNumber(
                                            Number(comboPrintCount) +
                                                Number(comboColorCount)
                                        )}
                                    </TableCell>
                                </TableRow>

                                {tipologies?.map(
                                    ({
                                        tipologyDescription,
                                        cost,
                                        quantity,
                                        comboPrintCount,
                                        comboColorCount,
                                    }) => (
                                        <TableRow
                                            key={uuid()}
                                            sx={{
                                                "& td, & th": {
                                                    border: 0,
                                                },
                                                "&:first-of-type td, &:first-of-type th":
                                                    {
                                                        fontWeight: 600,
                                                    },
                                            }}
                                        >
                                            <TableCell>
                                                {tipologyDescription}
                                            </TableCell>
                                            <TableCell>
                                                $ {formatNumber(cost)}
                                            </TableCell>
                                            <TableCell>
                                                {formatNumber(quantity)}
                                            </TableCell>
                                            <TableCell>
                                                {formatNumber(
                                                    Number(comboPrintCount) +
                                                        Number(comboColorCount)
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </Fragment>
                        )
                    )}
                </TableBody>
            </Table>
            {totalSKUS && totalPcs && totalCost && (
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        margin: "1.5rem",
                    }}
                >
                    Total: {formatNumber(totalSKUS)} SKU -{" "}
                    {formatNumber(totalPcs)} piezas - ${formatNumber(totalCost)}{" "}
                    costo de mercadería
                </Typography>
            )}
        </TableContainer>
    );
};

export { Overall };
