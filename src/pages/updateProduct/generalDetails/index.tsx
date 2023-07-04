import React from "react";

import {
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableBody,
    TextField,
    Button,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { StyledTableRow } from "../UpdateProductStyles";
import { useAppSelector } from "@/state/app/hooks";
import { useIconsContext } from "@components/hooks";

import { UpdateDropdown, UpdateInput, UpdateDate } from "../updateDropdowns";
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
                            <input type="file" hidden />
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
