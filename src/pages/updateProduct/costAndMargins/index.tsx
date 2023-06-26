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
    ["Costo(USD)", "Precio Venta(USD)", "Precio Tienda($)"],
    ["Margen", "Markup", ""],
    ["Precio Santander($)", "Margen Santander($)", ""],
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
                                {row.map((cell) => (
                                    <TableCell key={uuid()}>
                                        {cell}
                                        {cell !== "" && ": "}
                                        {edition && cell !== "" ? (
                                            <TextField
                                                id="outlined-read-only-input"
                                                defaultValue={cell}
                                                variant="standard"
                                                size="small"
                                                sx={{
                                                    width: "calc(100% - 15rem)",
                                                }}
                                            />
                                        ) : (
                                            <>{cell}</>
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
