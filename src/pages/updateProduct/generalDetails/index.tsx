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
    TextField,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { Form } from "@components/common";
import { Container, Content, StyledTableRow } from "../UpdateProductStyles";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/state/app/hooks";

const rowStructure = [
    ["Nombre", "Temporada"],
    ["Fecha de embarque", "Fecha depósito"],
    ["", ""],
    ["Unidad de gestión", "Rubro"],
    ["Tipología", "Peso"],
    ["Concepto", "Línea"],
    ["Body Fit", "Tiro"],
];

const bottomRows = ["Descripción", "Proyecta"];

export const GeneralDetails = () => {
    const { edition } = useAppSelector((state) => state.product);

    return (
        <section>
            <Stack direction={"row"} gap={2}>
                <div
                    className="item"
                    style={{
                        backgroundColor: "gray",
                        maxWidth: "30rem",
                        borderRadius: "10px",
                    }}
                >
                    Imagen
                </div>
                <div className="item">
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {rowStructure.map((row) => (
                                    <>
                                        {row[0] !== "" ? (
                                            <StyledTableRow key={uuid()}>
                                                {row.map((cell) => (
                                                    <TableCell key={uuid()}>
                                                        {cell}
                                                        {": "}
                                                        {edition ? (
                                                            <TextField
                                                                id="outlined-read-only-input"
                                                                defaultValue={
                                                                    cell
                                                                }
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
                                        ) : (
                                            <TableRow>
                                                <TableCell />
                                                <TableCell />
                                            </TableRow>
                                        )}
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Stack>
            <div>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {bottomRows.map((cell) => (
                                <StyledTableRow key={uuid()}>
                                    <TableCell>
                                        {cell}
                                        {": "}
                                        {edition ? (
                                            <TextField
                                                id="outlined-read-only-input"
                                                defaultValue={cell}
                                                variant="standard"
                                                size="small"
                                            />
                                        ) : (
                                            <>{cell}</>
                                        )}
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    );
};
