import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { OverallHeaders } from "@/types";

const Overall = () => {
    const headerValues = Object.entries(OverallHeaders);

    const headers = headerValues.map(([, value]) => value);

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number
    ) {
        return { name, calories, fat, carbs };
    }

    const rows = [
        createData("Frozen yoghurt", 159, 6.0, 24),
        createData("Ice cream sandwich", 237, 9.0, 37),
        createData("Eclair", 262, 16.0, 24),
        createData("Cupcake", 305, 3.7, 67),
        createData("Gingerbread", 356, 16.0, 49),
    ];

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
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "& td, & th": {
                                    border: 0,
                                },
                                "&:first-of-type td, &:first-of-type th": {
                                    fontWeight: 600,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                            <TableCell>{row.carbs}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow sx={{ height: "2rem" }} />
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "& td, & th": {
                                    border: 0,
                                },
                                "&:first-of-type td, &:first-of-type th": {
                                    fontWeight: 600,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                            <TableCell>{row.carbs}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow sx={{ height: "2rem" }} />
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "& td, & th": {
                                    border: 0,
                                },
                                "&:first-of-type td, &:first-of-type th": {
                                    fontWeight: 600,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                            <TableCell>{row.carbs}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow sx={{ height: "2rem" }} />
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "& td, & th": {
                                    border: 0,
                                },
                                "&:first-of-type td, &:first-of-type th": {
                                    fontWeight: 600,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                            <TableCell>{row.carbs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Typography
                variant="body1"
                sx={{ fontSize: "1.2rem", fontWeight: 600, margin: "1.5rem" }}
            >
                Total: {"183"} SKU - {"10.140"} piezas - ${"16.000.000"} costo
                de mercadería
            </Typography>
        </TableContainer>
    );
};

export { Overall };
