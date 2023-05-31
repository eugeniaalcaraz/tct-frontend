import React from "react";
import {
    Box,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
} from "@mui/material";
import { Form } from "@components/common";
import { Container, Content, StyledTableRow } from "../UpdateProductStyles";
import { useForm } from "react-hook-form";

export const GeneralDetails = () => {
    return (
        <section>
            <Stack direction={"row"} gap={2}>
                <div className="item" style={{ backgroundColor: "gray" }}>
                    Imagen
                </div>
                <div className="item">
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <StyledTableRow>
                                    <TableCell>Nombre: {"{Nombre}"}</TableCell>
                                    <TableCell>
                                        Temporada: {"{Temporada}"}
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        Fecha de embarque:{" "}
                                        {"{Fecha de embarque}"}
                                    </TableCell>
                                    <TableCell>
                                        Fecha deposito: {"{Fecha deposito}"}
                                    </TableCell>
                                </StyledTableRow>
                                <TableRow>
                                    <TableCell />
                                    <TableCell />
                                </TableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        Unidad de gestion:{" "}
                                        {"{Unidad de gestion}"}
                                    </TableCell>
                                    <TableCell>Rubro: {"{Rubro}"}</TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        Tipologia: {"{Tipologia}"}
                                    </TableCell>
                                    <TableCell>Peso: {"{Peso}"}</TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        Concepto: {"{Concepto}"}
                                    </TableCell>
                                    <TableCell>Linea: {"{Linea}"}</TableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <TableCell>
                                        Body Fit: {"{Body Fit}"}
                                    </TableCell>
                                    <TableCell>Tiro: {"{Tiro}"}</TableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Stack>
            <div>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <StyledTableRow>
                                <TableCell>
                                    {"Descriipcion: {descripcion}"}
                                </TableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <TableCell>{"Proyecta: {proyecta}"}</TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    );
};
