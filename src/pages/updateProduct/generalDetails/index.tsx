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
    Button,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { Form } from "@components/common";
import { Container, Content, StyledTableRow } from "../UpdateProductStyles";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/state/app/hooks";
import { useIconsContext } from "@components/hooks";

const rowStructure = [
    [
        { label: "Nombre", data: "name" },
        { label: "Temporada", data: "getSeasonById(idSeason)" },
        { label: "Año", data: "year" },
    ],
    [
        { label: "Fecha de embarque", data: "telas[0].shippingDate" },
        { label: "Fecha depósito", data: "telas[0].warehouseEntryDate" },
        { label: "", data: "" },
    ],
    [{ label: "", data: "" }],
    [
        { label: "Unidad de gestión", data: "getDepartmentById(idDepartment)" },
        { label: "Rubro", data: "getIndustryById(idIndustry)" },
        { label: "", data: "" },
    ],
    [
        { label: "Tipología", data: "getTipologyById(idTipology)" },
        { label: "Peso", data: "weight" },
        { label: "", data: "" },
    ],
    [
        { label: "Concepto", data: "getConceptById(idConcept)" },
        { label: "Línea", data: "getLineById(idLine)" },
        { label: "", data: "" },
    ],
    [
        { label: "Body Fit", data: "getBoyFitById(idBodyFit)" },
        { label: "Tiro", data: "getRiseById(idRise)" },
        { label: "", data: "" },
    ],
];

const bottomRows = [
    { label: "Descripción", data: "detail" },
    { label: "Proyecta", data: "proyecta" },
];

export const GeneralDetails = () => {
    const { edition } = useAppSelector((state) => state.product);
    const { icons } = useIconsContext();

    return (
        <section>
            <Stack direction={"row"} gap={2}>
                <div
                    className="item"
                    style={{
                        backgroundColor: "#DAD9D9",
                        maxWidth: "30rem",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {edition ? (
                        <Button
                            variant="outlined"
                            component="label"
                            className="files"
                        >
                            <span style={{ marginRight: "1rem" }}>
                                Modificar
                            </span>{" "}
                            {icons["upload"]}
                            <input
                                type="file"
                                hidden
                                // onChange={handlePreview}
                            />
                        </Button>
                    ) : (
                        <>Imagen</>
                    )}
                </div>
                <div className="item">
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {rowStructure.map((row) => (
                                    <>
                                        {row[0].label !== "" ? (
                                            <StyledTableRow key={uuid()}>
                                                {row.map(({ label, data }) => (
                                                    <TableCell key={uuid()}>
                                                        {label}
                                                        {label !== "" && ": "}
                                                        {edition &&
                                                        label !== "" ? (
                                                            <TextField
                                                                id="outlined-read-only-input"
                                                                defaultValue={
                                                                    data
                                                                }
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
