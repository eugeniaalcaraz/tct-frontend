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
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import StateOptions from "../stateLabel/StateOptions";
import {
    getTypeOfShipmentById,
    getNameById,
    getStatus,
    getStatusId,
} from "@/utils";
import dayjs from "dayjs";
import { UpdateInput, UpdateDropdown } from "../updateDropdowns";
import { ModalTypes } from "@/types";
import { useModal } from "@components/hooks";
import NewCombo from "@components/common/modal/NewCombo";
import {
    setFabricColors,
    setFabricPrints,
    updateFabricColorStatus,
    updateFabricPrintStatus,
    updateFabricStatus,
} from "@/state/features/updatedProduct";

export const Materials = () => {
    const [fabricIndex, setFabricIndex] = useState(-1);
    const { edition, localization, fabrics, colors } = useAppSelector(
        (state) => state.product
    );
    const { telas } = useAppSelector((state) => state.updatedProduct);
    const { modalType } = useAppSelector((state) => state.modal);
    const { openModal } = useModal();
    const dispatch = useAppDispatch();

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

    const handleDeleteColor = (index, parentIndex) => {
        const newColorsArray = [...telas[parentIndex].colors];
        newColorsArray?.splice(index, 1);
        dispatch(setFabricColors({ parentIndex, colors: newColorsArray }));
    };

    const handleDeletePrint = (index, parentIndex) => {
        const newPrintsArray = [...telas[parentIndex].prints];
        newPrintsArray?.splice(index, 1);
        dispatch(setFabricPrints({ parentIndex, prints: newPrintsArray }));
    };

    const handleFabricStatus = (stateInfo) => {
        const { index, status } = stateInfo;
        dispatch(updateFabricStatus({ index, status: getStatusId(status) }));
    };

    const handleColorStatus = (stateInfo) => {
        const { index, parentIndex, status } = stateInfo;
        dispatch(
            updateFabricColorStatus({
                index,
                parentIndex,
                status: getStatusId(status),
            })
        );
    };

    const handlePrintStatus = (stateInfo) => {
        const { index, parentIndex, status } = stateInfo;
        dispatch(
            updateFabricPrintStatus({
                index,
                parentIndex,
                status: getStatusId(status),
            })
        );
    };

    return (
        <section>
            <h3>MATERIALES</h3>
            {telas?.map((fabric, i) => (
                <div key={uuid()} style={{ margin: "40px 0" }}>
                    <div>
                        <div>
                            {getTypeOfShipmentById(
                                fabric?.placement,
                                localization
                            )}
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
                                updateAction={handleFabricStatus}
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
                            borderBottom: "0.1px solid #D9D9D9",
                        }}
                    >
                        {fabric?.colors?.map((combo, index) => (
                            <div
                                key={uuid()}
                                style={{
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
                                    updateAction={handleColorStatus}
                                    id={{
                                        index,
                                        parentIndex: i,
                                        item: "fabricColor",
                                    }}
                                    deleteAction={() =>
                                        handleDeleteColor(index, i)
                                    }
                                />
                            </div>
                        ))}
                        {edition && (
                            <Button
                                variant="outlined"
                                type="button"
                                color="secondary"
                                sx={{
                                    height: "fit-content",
                                    marginLeft: "2rem",
                                }}
                                onClick={() =>
                                    handleNewCombo(ModalTypes.NewFabricColor, i)
                                }
                            >
                                + COLOR
                            </Button>
                        )}
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={"15px"}
                        sx={{
                            padding: "20px 0",
                            flexWrap: "wrap",
                            alignItems: "end",
                            height: "12rem",
                            borderBottom: "0.1px solid #D9D9D9",
                        }}
                    >
                        {fabric?.prints?.map((print, index) => (
                            <div
                                key={uuid()}
                                style={{
                                    padding: "0 2rem",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ComboItem
                                    combo={index + 1}
                                    name={print?.nombre}
                                    colorCount={print?.cantidadColor}
                                    status={getStatus(Number(print?.idStatus))}
                                    updateAction={handlePrintStatus}
                                    id={{
                                        index,
                                        parentIndex: i,
                                        item: "fabricPrint",
                                    }}
                                    deleteAction={() =>
                                        handleDeletePrint(index, i)
                                    }
                                />
                            </div>
                        ))}
                        {edition && (
                            <Button
                                variant="outlined"
                                type="button"
                                color="secondary"
                                sx={{
                                    height: "fit-content",
                                    marginLeft: "2rem",
                                }}
                                onClick={() =>
                                    handleNewCombo(ModalTypes.NewFabricPrint, i)
                                }
                            >
                                + ESTAMPA
                            </Button>
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
