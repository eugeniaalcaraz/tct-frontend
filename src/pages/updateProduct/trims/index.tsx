import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import {
    TableContainer,
    Table,
    TableCell,
    Stack,
    TextField,
} from "@mui/material";
import { ComboItem } from "../comboItem";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";
import StateOptions from "../stateLabel/StateOptions";
import { getNameById, getStatus } from "@/utils";
import dayjs from "dayjs";

export const Trims = () => {
    const { edition, updateProduct, trims, colors } = useAppSelector(
        (state) => state.product
    );

    const trimsCombo = updateProduct?.avios;

    const rowStructure = [
        [
            { label: "Tipo", data: "" },
            { label: "Cantidad", data: "quantity" },
        ],
    ];

    return (
        <section>
            <h3 style={{ marginBottom: "1.5rem" }}>AVÍOS</h3>
            {trimsCombo?.map((avio, i) => (
                <>
                    <StateOptions
                        status={getStatus(avio?.idStatus)}
                        id={{ index: i, item: "trims" }}
                    />

                    <TableContainer>
                        <Table>
                            {rowStructure.map((row) => (
                                <StyledTableRow key={uuid()}>
                                    {row.map(({ label, data }) => (
                                        <TableCell key={uuid()}>
                                            {label}
                                            {label !== "" && ": "}
                                            {edition && label !== "" ? (
                                                <TextField
                                                    id="outlined-read-only-input"
                                                    defaultValue={
                                                        label === "Tipo"
                                                            ? getNameById(
                                                                  avio?.idAvio,
                                                                  trims
                                                              )
                                                            : avio[data]
                                                    }
                                                    variant="standard"
                                                    size="small"
                                                    sx={{
                                                        width: "calc(100% - 15rem)",
                                                    }}
                                                />
                                            ) : (
                                                <>{avio[data]}</>
                                            )}
                                        </TableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                        </Table>
                    </TableContainer>
                    <Stack
                        direction={"row"}
                        gap={"15px"}
                        sx={{ padding: "20px 0", flexWrap: "wrap" }}
                    >
                        {avio?.colors?.map((combo, index) => (
                            <div
                                key={uuid()}
                                style={{
                                    marginRight: "5rem",
                                    padding: "0 2rem",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ComboItem
                                    combo={index + 1}
                                    color={getNameById(combo?.idcolor, colors)}
                                    status={getStatus(combo?.idstatus)}
                                    id={{
                                        index,
                                        parentIndex: i,
                                        item: "trimColor",
                                    }}
                                />
                            </div>
                        ))}
                    </Stack>
                    <Stack />
                </>
            ))}
        </section>
    );
};
