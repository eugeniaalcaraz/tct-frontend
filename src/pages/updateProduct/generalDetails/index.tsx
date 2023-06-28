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
    MenuItem,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { Form } from "@components/common";
import { Container, Content, StyledTableRow } from "../UpdateProductStyles";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/state/app/hooks";
import { useIconsContext } from "@components/hooks";
import { OptionsType } from "@/types";

export const GeneralDetails = () => {
    const {
        edition,
        allSeasons,
        supplier,
        managementUnit,
        tipology,
        fabrics,
        designers,
        countries,
        status,
        typeOfshipment,
        brands,
        industries,
        concepts,
        lines,
        bodyFit,
    } = useAppSelector((state) => state.product);

    const { icons } = useIconsContext();

    const rowStructure = [
        [
            { label: "Nombre", data: "name" },
            {
                label: "Temporada",
                data: "getSeasonById(idSeason)",
                select: true,
                options: allSeasons?.map(
                    ({ IdSeason, SeasonName }): OptionsType => ({
                        Id: String(IdSeason),
                        Description: SeasonName,
                    })
                ),
            },
            { label: "Año", data: "year" },
        ],
        [
            { label: "Fecha de embarque", data: "telas[0].shippingDate" },
            { label: "Fecha depósito", data: "telas[0].warehouseEntryDate" },
            { label: "", data: "" },
        ],
        [{ label: "", data: "" }],
        [
            {
                label: "Unidad de gestión",
                data: "getDepartmentById(idDepartment)",
                select: true,
                options: managementUnit,
            },
            {
                label: "Rubro",
                data: "getIndustryById(idIndustry)",
                select: true,
                options: industries,
            },
            { label: "", data: "" },
        ],
        [
            {
                label: "Tipología",
                data: "getTipologyById(idTipology)",
                select: true,
                options: tipology,
            },
            { label: "Peso", data: "weight" },
            { label: "", data: "" },
        ],
        [
            {
                label: "Concepto",
                data: "getConceptById(idConcept)",
                select: true,
                options: concepts,
            },
            {
                label: "Línea",
                data: "getLineById(idLine)",
                select: true,
                options: lines,
            },
            { label: "", data: "" },
        ],
        [
            {
                label: "Body Fit",
                data: "getBoyFitById(idBodyFit)",
                select: true,
                options: bodyFit,
            },
            {
                label: "Tiro",
                data: "getRiseById(idRise)",
                select: true,
                options: bodyFit,
            },
            { label: "", data: "" },
        ],
    ];

    const bottomRows = [
        { label: "Descripción", data: "detail" },
        { label: "Proyecta", data: "proyecta" },
    ];

    return (
        <section>
            <Stack direction={"row"} gap={2}>
                <div
                    className="item"
                    style={{
                        backgroundColor: "#DAD9D9",
                        width: "350px",
                        maxWidth: "350px",
                        //height: "330px",
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
                                                {row.map((row) => (
                                                    <TableCell key={uuid()}>
                                                        {row?.label}
                                                        {row?.label !== "" &&
                                                            ": "}
                                                        {edition &&
                                                        row?.label !== "" ? (
                                                            <TextField
                                                                id="outlined-read-only-input"
                                                                defaultValue={
                                                                    row?.data
                                                                }
                                                                variant="standard"
                                                                size="small"
                                                                sx={{
                                                                    width: "calc(100% - 15rem)",
                                                                }}
                                                                select={
                                                                    row?.select
                                                                }
                                                            >
                                                                {row?.select &&
                                                                    row?.options?.map(
                                                                        (
                                                                            option
                                                                        ) => (
                                                                            <MenuItem
                                                                                key={
                                                                                    option.Id
                                                                                }
                                                                                value={
                                                                                    option.Id
                                                                                }
                                                                            >
                                                                                {
                                                                                    option.Description
                                                                                }
                                                                            </MenuItem>
                                                                        )
                                                                    )}
                                                            </TextField>
                                                        ) : (
                                                            <>{row?.data}</>
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
