import React, { useEffect } from "react";
import dayjs from "dayjs";
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
import { getNameById, getSeasonById } from "@/utils";

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
        rises,
        updateProduct,
    } = useAppSelector((state) => state.product);

    const { icons } = useIconsContext();
    const productInfo = updateProduct?.basicInfo[0];
    const comboInfo = updateProduct?.fabrics[0];

    const rowStructure = [
        [
            { label: "Nombre", data: productInfo?.name },
            {
                label: "Temporada",
                data: getSeasonById(productInfo?.idSeason, allSeasons),
                select: true,
                options: allSeasons?.map(
                    ({ IdSeason, SeasonName }): OptionsType => ({
                        Id: String(IdSeason),
                        Description: SeasonName,
                    })
                ),
            },
            { label: "Año", data: productInfo?.year },
        ],
        [
            {
                label: "Fecha de embarque",
                data: dayjs(comboInfo?.shippinDate).format("YYYY-MM-DD"), //updateProduct?.telas[0]?.shippingDate,
            },
            {
                label: "Fecha depósito",
                data: dayjs(comboInfo?.warehouseEntryDate).format("YYYY-MM-DD"), //updateProduct?.telas[0]?.warehouseEntryDate,
            },
            { label: "", data: "" },
        ],
        [{ label: "", data: "" }],
        [
            {
                label: "Unidad de gestión",
                data: "", //getNameById(updateProduct?.idDepartment, managementUnit),
                select: true,
                options: managementUnit,
            },
            {
                label: "Rubro",
                data: getNameById(productInfo?.idIndustry, industries),
                select: true,
                options: industries,
            },
            { label: "", data: "" },
        ],
        [
            {
                label: "Tipología",
                data: getNameById(productInfo?.idTipology, tipology),
                select: true,
                options: tipology,
            },
            { label: "Peso", data: productInfo?.weight },
            { label: "", data: "" },
        ],
        [
            {
                label: "Concepto",
                data: getNameById(productInfo?.idConcept, concepts),
                select: true,
                options: concepts,
            },
            {
                label: "Línea",
                data: getNameById(productInfo?.idLine, lines),
                select: true,
                options: lines,
            },
            { label: "", data: "" },
        ],
        [
            {
                label: "Body Fit",
                data: getNameById(productInfo?.idBodyFit, bodyFit),
                select: true,
                options: bodyFit,
            },
            {
                label: "Tiro",
                data: getNameById(productInfo?.idRise, rises),
                select: true,
                options: rises,
            },
            { label: "", data: "" },
        ],
    ];

    const bottomRows = [
        { label: "Descripción", data: productInfo?.detail },
        { label: "Proyecta", data: productInfo?.proyecta === 0 ? "No" : "Si" },
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
                                                                                key={uuid()}
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
