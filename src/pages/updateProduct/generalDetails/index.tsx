import React, { Fragment, useEffect, useState } from "react";

import {
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableBody,
    Button,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { StyledTableRow } from "../UpdateProductStyles";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { useIconsContext } from "@components/hooks";

import {
    UpdateDropdown,
    UpdateInput,
    UpdateDate,
    UpdateRadio,
} from "../updateDropdowns";
import { getBottomRows, getGeneralDetails } from "./getGeneralDetails";
import { toBase64 } from "@/utils/toBase64";
import { setPicture } from "@/state/features/updatedProduct";

export const GeneralDetails = () => {
    const {
        edition,
        allSeasons,
        managementUnit,
        tipologiesByIndustry,
        industriesByUnit,
        concepts,
        lines,
        bodyFit,
        rises,
    } = useAppSelector((state) => state.product);

    const updateData = useAppSelector((state) => state.updatedProduct);
    const { idDepartment } = useAppSelector((state) => state.updatedProduct);
    // const [rowStructure, setRowStructure] = useState(
    //     getGeneralDetails(
    //         updateData,
    //         allSeasons,
    //         managementUnit,
    //         tipologiesByIndustry,
    //         industriesByUnit,
    //         concepts,
    //         lines,
    //         bodyFit,
    //         rises
    //     )
    // );

    const { icons } = useIconsContext();
    const dispatch = useAppDispatch();

    const rowStructure = getGeneralDetails(
        updateData,
        allSeasons,
        managementUnit,
        tipologiesByIndustry,
        industriesByUnit,
        concepts,
        lines,
        bodyFit,
        rises
    );

    const bottomRows = getBottomRows(updateData);

    const handleFoto = async (e) => {
        let attachments: DataTransfer = new DataTransfer();

        if (e.dataTransfer) {
            attachments = e.dataTransfer.files;
        } else if (e.target) {
            attachments = e.target.files;
        }
        const filesSelected = [];
        for (let i = 0; i < Object.keys(attachments).length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            filesSelected.push(URL.createObjectURL(attachments[i]));
        }

        dispatch(setPicture(filesSelected[0]));
    };

    // useEffect(() => {
    //     handleRowStructure();
    // }, [tipologiesByIndustry, industriesByUnit, idDepartment, updateData]);

    return (
        <section>
            <Stack direction={"row"} gap={2}>
                <div
                    className="item"
                    style={{
                        backgroundColor: "#DAD9D9",
                        width: "350px",
                        maxWidth: "350px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {edition ? (
                        <div
                            style={{
                                position: "relative",
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <img
                                style={{
                                    height: "100%",
                                    width: "350px",
                                    maxWidth: "350px",
                                    objectFit: "cover",
                                    filter: "blur(2px) grayscale(20%) opacity(20%)",
                                }}
                                alt={`Foto de producto ${updateData?.idProduct}`}
                                src={updateData?.pictures[0]?.pic}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    component="label"
                                    className="files"
                                    sx={{
                                        background: "#DAD9D9",
                                        "&:hover": { background: "#DAD9D9" },
                                    }}
                                >
                                    <span style={{ marginRight: "1rem" }}>
                                        Modificar
                                    </span>{" "}
                                    {icons["upload"]}
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFoto}
                                    />
                                </Button>
                            </span>
                        </div>
                    ) : (
                        <img
                            style={{
                                height: "100%",
                                width: "350px",
                                maxWidth: "350px",
                                objectFit: "cover",
                            }}
                            alt={`Foto de producto ${updateData?.idProduct}`}
                            src={updateData?.pictures[0]?.pic}
                        />
                    )}
                </div>
                <div className="item">
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {rowStructure.map((row) => (
                                    <Fragment key={uuid()}>
                                        {row[0].label !== "" ? (
                                            <StyledTableRow key={uuid()}>
                                                {row.map((row) => (
                                                    <TableCell key={uuid()}>
                                                        {edition ? (
                                                            <span
                                                                style={{
                                                                    display:
                                                                        "inline-block",
                                                                    margin: "0.6rem 0.6rem 0 0",
                                                                }}
                                                            >
                                                                {row?.label}
                                                                {row?.label !==
                                                                    "" && ": "}
                                                            </span>
                                                        ) : (
                                                            <>
                                                                {row?.label}
                                                                {row?.label !==
                                                                    "" && ": "}
                                                            </>
                                                        )}

                                                        {edition &&
                                                        row?.label !== "" ? (
                                                            row?.date ? (
                                                                <UpdateDate
                                                                    name={
                                                                        row.name
                                                                    }
                                                                    initialValue={
                                                                        row.data
                                                                    }
                                                                />
                                                            ) : row?.select ? (
                                                                <UpdateDropdown
                                                                    value={
                                                                        row?.data ===
                                                                        "-"
                                                                            ? ""
                                                                            : updateData[
                                                                                  row
                                                                                      .name
                                                                              ]
                                                                    }
                                                                    options={
                                                                        row.options
                                                                    }
                                                                    name={
                                                                        row.name
                                                                    }
                                                                    disabled={
                                                                        row.disabled
                                                                    }
                                                                />
                                                            ) : (
                                                                <UpdateInput
                                                                    value={
                                                                        row.data
                                                                    }
                                                                    name={
                                                                        row.name
                                                                    }
                                                                />
                                                            )
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
                                    </Fragment>
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
                            {bottomRows.map(({ label, data, name }) => (
                                <StyledTableRow key={uuid()}>
                                    <TableCell>
                                        {edition ? (
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    margin: "0.6rem 0.6rem 0 0",
                                                }}
                                            >
                                                {label}
                                                {label !== "" && ": "}
                                            </span>
                                        ) : (
                                            <>
                                                {label}
                                                {label !== "" && ": "}
                                            </>
                                        )}
                                        {edition ? (
                                            name === "detail" ? (
                                                <UpdateInput
                                                    width="calc(100% - 10rem)"
                                                    value={data}
                                                    name={name}
                                                />
                                            ) : (
                                                <UpdateRadio
                                                    value={data}
                                                    name={name}
                                                />
                                            )
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
