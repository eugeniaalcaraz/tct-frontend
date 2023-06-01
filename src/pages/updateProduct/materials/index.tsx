import {
    TableContainer,
    Table,
    TableCell,
    TableBody,
    Box,
    Stack,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboItem } from "../comboItem";
import { StatusLabel } from "../stateLabel";

export const Materials = () => {
    return (
        <section>
            <h3>Materiales</h3>
            {[...Array(3).keys()].map((index) => (
                <div key={index} style={{ margin: "40px 0" }}>
                    <div>
                        <div>{"{LOCALIZACION DE PRENDA}"}</div>
                        <Stack
                            direction={"row"}
                            gap={"7px"}
                            style={{
                                alignItems: "center",
                                marginTop: "8px",
                                marginBottom: "40px",
                            }}
                        >
                            <StatusLabel status={"reprobado"} />
                            <div>fechaEstadoCalidad</div>
                        </Stack>
                    </div>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <StyledTableRow>
                                    <TableCell>
                                        {"Calidad: {calidad}"}
                                    </TableCell>
                                    <TableCell>
                                        {"Composicion: {peso}"}
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        {"Peso: {pesoCalidad1}"}
                                    </TableCell>
                                    <TableCell>
                                        {"Consumo: {consumo}"}
                                    </TableCell>
                                </StyledTableRow>
                            </TableBody>
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
                                <ComboItem />
                            </div>
                        ))}
                    </Stack>
                </div>
            ))}
        </section>
    );
};
