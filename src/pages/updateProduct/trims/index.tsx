import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { TableContainer, Table, TableCell, Stack } from "@mui/material";
import { ComboItem } from "../comboItem";

export const Trims = () => {
    return (
        <section>
            <TableContainer>
                <Table>
                    <StyledTableRow>
                        <TableCell>{"Tipo: ${tipoAvio}"}</TableCell>
                        <TableCell>{"Cantidad: ${cantidadAvio}"}</TableCell>
                    </StyledTableRow>
                </Table>
            </TableContainer>
            <Stack
                direction={"row"}
                gap={"15px"}
                sx={{ padding: "20px 0", flexWrap: "wrap" }}
            >
                {[...Array(5).keys()].map((index) => (
                    <div
                        key={index}
                        style={{
                            width: "31%",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <ComboItem key={index} />
                    </div>
                ))}
            </Stack>
            <Stack />
        </section>
    );
};
