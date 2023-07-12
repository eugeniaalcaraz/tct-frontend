import {
    TableContainer,
    Table,
    TableCell,
    TableBody,
    Stack,
    Button,
} from "@mui/material";
import React, { useState } from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboItem } from "../comboItem";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";
import StateOptions from "../stateLabel/StateOptions";
import { getFabricById, getNameById, getStatus } from "@/utils";
import dayjs from "dayjs";
import { UpdateInput, UpdateDropdown } from "../updateDropdowns";
import { ModalTypes } from "@/types";
import { useModal } from "@components/hooks";
import NewCombo from "@components/common/modal/NewCombo";

export const Materials = () => {
    const [fabricIndex, setFabricIndex] = useState(-1);
    const { edition, localization, fabrics, colors } = useAppSelector(
        (state) => state.product
    );
    const { telas } = useAppSelector((state) => state.updatedProduct);
    const { modalType } = useAppSelector((state) => state.modal);
    const { openModal } = useModal();

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

    const handleNewCombo = (modalType, fabricIndex) => {
        openModal(modalType);
        setFabricIndex(fabricIndex);
    };

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
                                status={getStatus(Number(fabric?.idStatus))}
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
                                                    {edition ? (
                                                        <span
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                margin: "0.6rem 0.6rem 0 0",
                                                            }}
                                                        >
                                                            {label}
                                                            {label !== "" &&
                                                                ": "}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            {label}
                                                            {label !== "" &&
                                                                ": "}
                                                        </>
                                                    )}
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
                        sx={{
                            padding: "20px 0",
                            flexWrap: "wrap",
                            alignItems: "end",
                            height: "12rem",
                        }}
                    >
                        {fabric?.colors?.map((combo, index) => (
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
                                    status={getStatus(Number(combo?.idStatus))}
                                    id={{
                                        index,
                                        parentIndex: i,
                                        item: "fabricColor",
                                    }}
                                />
                            </div>
                        ))}
                        {fabric?.prints?.map((print, index) => (
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
                                    combo={fabric?.colors?.length + index + 1}
                                    name={print?.nombre}
                                    colorCount={print?.cantidadColor}
                                    status={getStatus(Number(print?.idStatus))}
                                    id={{
                                        index,
                                        parentIndex: i,
                                        item: "fabricPrint",
                                    }}
                                />
                            </div>
                        ))}
                        {edition && (
                            <>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    color="secondary"
                                    sx={{
                                        height: "fit-content",
                                    }}
                                    onClick={() =>
                                        handleNewCombo(
                                            ModalTypes.NewFabricColor,
                                            i
                                        )
                                    }
                                >
                                    + COLOR
                                </Button>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    color="secondary"
                                    sx={{
                                        height: "fit-content",
                                    }}
                                    onClick={() =>
                                        handleNewCombo(
                                            ModalTypes.NewFabricPrint,
                                            i
                                        )
                                    }
                                >
                                    + ESTAMPA
                                </Button>
                            </>
                        )}
                    </Stack>
                </div>
            ))}
            {(modalType === ModalTypes.NewFabricColor ||
                modalType === ModalTypes.NewFabricPrint) && (
                <NewCombo parentIndex={fabricIndex} />
            )}
        </section>
    );
};
