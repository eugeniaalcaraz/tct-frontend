import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TextField,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { useAppSelector } from "@/state/app/hooks";
import { v4 as uuid } from "uuid";

const rowStructure = [
    [
        { label: "Costo(USD)", data: "cost" },
        { label: "Precio Venta(USD)", data: "costInStore" },
        { label: "Precio Tienda($)", data: "costInStore * conversionRate" },
    ],
    [
        { label: "Margen", data: "calculo de margen" },
        { label: "Markup", data: "" },
        { label: "", data: "" },
    ],
    [
        { label: "Precio Santander($)", data: "" },
        { label: "Margen Santander($)", data: "" },
        { label: "", data: "" },
    ],
];

export const CostAndMargin = () => {
    const { edition } = useAppSelector((state) => state.product);

    return (
        <section>
            <h3>Costo y margen</h3>
            <TableContainer>
                <Table>
                    <TableBody>
                        {rowStructure.map((row) => (
                            <StyledTableRow key={uuid()}>
                                {row.map(({ label, data }) => (
                                    <TableCell key={uuid()}>
                                        {label}
                                        {label !== "" && ": "}
                                        {edition && label !== "" ? (
                                            <TextField
                                                id="outlined-read-only-input"
                                                defaultValue={data}
                                                variant="standard"
                                                size="small"
                                                sx={{
                                                    width: "calc(100% - 15rem)",
                                                }}
                                            />
                                        ) : (
                                            <>{data}</>
                                        )}
                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};
