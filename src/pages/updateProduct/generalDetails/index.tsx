import React from "react";

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
import { useAppSelector } from "@/state/app/hooks";
import { useIconsContext } from "@components/hooks";

import {
    UpdateDropdown,
    UpdateInput,
    UpdateDate,
    UpdateRadio,
} from "../updateDropdowns";
import { getBottomRows, getGeneralDetails } from "./getGeneralDetails";

export const GeneralDetails = () => {
    const {
        edition,
        allSeasons,
        managementUnit,
        tipology,
        industries,
        concepts,
        lines,
        bodyFit,
        rises,
    } = useAppSelector((state) => state.product);

    const updateData = useAppSelector((state) => state.updatedProduct);

    const { icons } = useIconsContext();
    const rowStructure = getGeneralDetails(
        updateData,
        allSeasons,
        managementUnit,
        tipology,
        industries,
        concepts,
        lines,
        bodyFit,
        rises
    );

    const bottomRows = getBottomRows(updateData);

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
                        <Button
                            variant="outlined"
                            component="label"
                            className="files"
                        >
                            <span style={{ marginRight: "1rem" }}>
                                Modificar
                            </span>{" "}
                            {icons["upload"]}
                            <input type="file" hidden />
                        </Button>
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
                                    <>
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
                                                                        updateData[
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
