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
import { UpdateDropdown, UpdateInput } from "../updateDropdowns";

export const Trims = () => {
    const { edition, trims, colors } = useAppSelector((state) => state.product);

    const { avios } = useAppSelector((state) => state.updatedProduct);

    const rowStructure = [
        [
            { label: "Tipo", data: "idAvio", name: "idAvio", select: true },
            {
                label: "Cantidad",
                data: "quantity",
                name: "quantity",
                select: false,
            },
        ],
    ];

    return (
        <section>
            <h3 style={{ marginBottom: "1.5rem" }}>AVÍOS</h3>
            {avios?.map((avio, i) => (
                <>
                    <StateOptions
                        status={getStatus(avio?.idStatus)}
                        id={{ index: i, item: "trims" }}
                    />

                    <TableContainer>
                        <Table>
                            {rowStructure.map((row) => (
                                <StyledTableRow key={uuid()}>
                                    {row.map(
                                        ({ label, data, select, name }) => (
                                            <TableCell key={uuid()}>
                                                {edition ? (
                                                    <span
                                                        style={{
                                                            display:
                                                                "inline-block",
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
                                                {edition && label !== "" ? (
                                                    select ? (
                                                        <UpdateDropdown
                                                            value={avio[name]}
                                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                            // @ts-ignore
                                                            options={
                                                                trims ?? []
                                                            }
                                                            name={name}
                                                        />
                                                    ) : (
                                                        <UpdateInput
                                                            value={avio[data]}
                                                            name={name}
                                                        />
                                                    )
                                                ) : (
                                                    <>{avio[data]}</>
                                                )}
                                            </TableCell>
                                        )
                                    )}
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
