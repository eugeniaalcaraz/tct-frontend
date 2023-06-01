import { TableContainer, Table, TableBody, TableCell } from "@mui/material";
import React from "react";
import { StyledTableRow } from "../../UpdateProductStyles";

export const ComboTable = () => {
    return (
        <div>
            <div style={{ fontWeight: "400", lineHeight: "19px" }}>Combo 1</div>
            <TableContainer>
                <Table>
                    <TableBody>
                        <StyledTableRow>
                            <TableCell>{"Destino:{destino}"}</TableCell>
                            <TableCell>{"Embarque:{embarque}"}</TableCell>
                            <TableCell>{"Cantidad:{cantidadCombo}"}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>
                                {"Fecha de embarque:{fechaEmbarque}"}
                            </TableCell>
                            <TableCell>
                                {"Ingreso Deposito:{ingresoDeposito}"}
                            </TableCell>
                            <TableCell>
                                {"Ingreso Tienda:{ingresoTienda}"}
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
