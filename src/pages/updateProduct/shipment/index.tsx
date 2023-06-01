import { TableContainer, Table, TableCell, Stack } from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboTable } from "./comboTable/ComboTable";

export const Shipment = () => {
    return (
        <section>
            <h3>Embarque</h3>
            <div style={{ marginBottom: "50px" }}>
                <TableContainer>
                    <Table>
                        <StyledTableRow>
                            <TableCell>{"Origen:{origen}"}</TableCell>
                            <TableCell>
                                {"Cantidad Total: {cantidadTotal}"}
                            </TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>{"Proveedor: {proveedor}"}</TableCell>
                            <TableCell>
                                {"Codigo de fabrica: {codigoFabrica}"}
                            </TableCell>
                        </StyledTableRow>
                    </Table>
                </TableContainer>
            </div>
            <Stack rowGap={"40px"}>
                {[...Array(3).keys()].map((index) => (
                    <ComboTable key={index} />
                ))}
            </Stack>
        </section>
    );
};
