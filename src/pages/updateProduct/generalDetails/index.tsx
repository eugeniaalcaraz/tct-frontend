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
    [
        { label: "Nombre", data: "name" },
        { label: "Temporada", data: "getSeasonById(idSeason) year" },
    ],
    [
        { label: "Fecha de embarque", data: "telas[0].shippingDate" },
        { label: "Fecha depósito", data: "telas[0].warehouseEntryDate" },
    ],
    ["", ""],
    [
        { label: "Unidad de gestión", data: "getDepartmentById(idDepartment)" },
        { label: "Rubro", data: "getIndustryById(idIndustry)" },
    ],
    [
        { label: "Tipología", data: "getTipologyById(idTipology)" },
        { label: "Peso", data: "weight" },
    ],
    [
        { label: "Concepto", data: "getConceptById(idConcept)" },
        { label: "Línea", data: "getLineById(idLine)" },
    ],
    [
        { label: "Body Fit", data: "getBoyFitById(idBodyFit)" },
        { label: "Tiro", data: "getRiseById(idRise)" },
    ],
];

const bottomRows = [
    { label: "Descripción", data: "detail" },
    { label: "Proyecta", data: "proyecta" },
];

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
                                                        {cell?.label}
                                                        {": "}
                                                        {edition ? (
                                                            <TextField
                                                                id="outlined-read-only-input"
                                                                defaultValue={
                                                                    cell?.data
                                                                }
                                                                variant="standard"
                                                                size="small"
                                                                sx={{
                                                                    width: "calc(100% - 15rem)",
                                                                }}
                                                            />
                                                        ) : (
                                                            <>{cell?.data}</>
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
                            {bottomRows.map(({ label, data }) => (
                                <StyledTableRow key={uuid()}>
                                    <TableCell>
                                        {label}
                                        {": "}
                                        {edition ? (
                                            <TextField
                                                id="outlined-read-only-input"
                                                defaultValue={data}
                                                variant="standard"
                                                size="small"
                                            />
                                        ) : (
                                            <>{data}</>
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
