import { TableContainer, Table, TableBody, TableCell } from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";

export const CostAndMargin = () => {
    return (
        <section>
            <h3>Costo y margen</h3>
            <TableContainer>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <TableCell>{"Costo(USD):{costoUSD}"}</TableCell>
                            <TableCell>
                                {"Precio Venta USD: {precioVentaUSD}"}
                            </TableCell>
                            <TableCell>
                                {"Precio Tienda($): {precioTienda}"}
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>{"Margen: {margen}"}</TableCell>
                            <TableCell>{"Markup: {markup}"}</TableCell>
                            <TableCell></TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                {"Precio Santander($): {precioSantander}"}
                            </TableCell>
                            <TableCell>
                                {"Margen Santander($): {margenSantander}"}
                            </TableCell>
                            <TableCell></TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};
