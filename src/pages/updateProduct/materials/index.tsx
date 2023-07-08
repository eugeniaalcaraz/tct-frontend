import {
    TableContainer,
    Table,
    TableCell,
    TableBody,
    Stack,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboItem } from "../comboItem";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";
import StateOptions from "../stateLabel/StateOptions";
import { getFabricById, getNameById, getStatus } from "@/utils";
import dayjs from "dayjs";
import { UpdateInput, UpdateDropdown } from "../updateDropdowns";

export const Materials = () => {
    const { edition, localization, fabrics, colors } = useAppSelector(
        (state) => state.product
    );

    const { telas } = useAppSelector((state) => state.updatedProduct);

    const rowStructure = [
        [
            {
                label: "Calidad",
                data: "idFabric",
                name: "idFabric",
                select: true,
            },
            {
                label: "Composición",
                data: "composition",
                name: "composition",
                select: false,
            },
        ],
        [
            { label: "Peso", data: "weight", name: "weight", select: false },
            {
                label: "Consumo",
                data: "consumption",
                name: "consumption",
                select: false,
            },
        ],
    ];

    return (
        <section>
            <h3>MATERIALES</h3>
            {telas?.map((fabric, i) => (
                <div key={uuid()} style={{ margin: "40px 0" }}>
                    <div>
                        <div>
                            {getNameById(fabric?.idPlacement, localization)}
                        </div>
                        <Stack
                            direction={"row"}
                            gap={"7px"}
                            style={{
                                alignItems: "center",
                                marginTop: "8px",
                                marginBottom: "40px",
                            }}
                        >
                            <StateOptions
                                status={getStatus(fabric?.idStatus)}
                                id={{ index: i, item: "fabric" }}
                            />
                            <div>{dayjs().format("YYYY-MM-DD")}</div>
                        </Stack>
                    </div>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {rowStructure?.map((row) => (
                                    <StyledTableRow key={uuid()}>
                                        {row.map(
                                            ({ label, data, name, select }) => (
                                                <TableCell key={uuid()}>
                                                    {label}
                                                    {label !== "" && ": "}
                                                    {edition &&
                                                    label !== "" &&
                                                    name !== "composition" ? (
                                                        select ? (
                                                            <UpdateDropdown
                                                                value={
                                                                    fabric[name]
                                                                }
                                                                options={
                                                                    fabrics?.map(
                                                                        ({
                                                                            IdFabric,
                                                                            Description,
                                                                        }) => ({
                                                                            Id: String(
                                                                                IdFabric
                                                                            ),
                                                                            Description,
                                                                        })
                                                                    ) ?? []
                                                                }
                                                                name={name}
                                                            />
                                                        ) : (
                                                            <UpdateInput
                                                                value={
                                                                    fabric[data]
                                                                }
                                                                name={name}
                                                            />
                                                        )
                                                    ) : (
                                                        <>
                                                            {String(
                                                                fabric[data]
                                                            )}
                                                        </>
                                                    )}
                                                </TableCell>
                                            )
                                        )}
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack
                        direction={"row"}
                        gap={"15px"}
                        sx={{ padding: "20px 0", flexWrap: "wrap" }}
                    >
                        {fabric?.comboColors?.map((combo, index) => (
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
                                    color={getNameById(combo?.idColor, colors)}
                                    status={getStatus(combo?.idStatus)}
                                    id={{
                                        index,
                                        parentIndex: i,
                                        item: "fabricColor",
                                    }}
                                />
                            </div>
                        ))}
                        {fabric?.comboPrints?.map(
                            (print, index) =>
                                fabric?.id === print?.idComboFabric && (
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
                                            combo={
                                                fabric?.comboColors?.length +
                                                index +
                                                1
                                            }
                                            name={"idPrint"}
                                            status={getStatus(print?.idStatus)}
                                            id={{
                                                index,
                                                parentIndex: i,
                                                item: "fabricPrint",
                                            }}
                                        />
                                    </div>
                                )
                        )}
                    </Stack>
                </div>
            ))}
        </section>
    );
};
