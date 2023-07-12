import React, { useState } from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import {
    TableContainer,
    Table,
    TableCell,
    Stack,
    TextField,
    Button,
} from "@mui/material";
import { ComboItem } from "../comboItem";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import StateOptions from "../stateLabel/StateOptions";
import { getNameById, getStatus } from "@/utils";
import { UpdateDropdown, UpdateInput } from "../updateDropdowns";
import { ModalTypes } from "@/types";
import NewCombo from "@components/common/modal/NewCombo";
import { useModal } from "@components/hooks";
import { setTrimColors } from "@/state/features/updatedProduct";

export const Trims = () => {
    const [parentIndex, setParentIndex] = useState(-1);
    const { edition, trims, colors } = useAppSelector((state) => state.product);
    const { avios } = useAppSelector((state) => state.updatedProduct);
    const { modalType } = useAppSelector((state) => state.modal);
    const { openModal } = useModal();
    const dispatch = useAppDispatch();

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

    const handleNewCombo = (modalType, index) => {
        openModal(modalType);
        setParentIndex(index);
    };

    const handleDeleteColor = (index, parentIndex) => {
        const newColors = [...avios[parentIndex].colors];
        newColors?.splice(index, 1);
        dispatch(setTrimColors({ parentIndex, colors: newColors }));
    };

    return (
        <section>
            <h3 style={{ marginBottom: "1.5rem" }}>AVÍOS</h3>
            {avios?.map((avio, i) => (
                <>
                    <StateOptions
                        status={getStatus(Number(avio?.idStatus))}
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
                        sx={{
                            padding: "20px 0",
                            flexWrap: "wrap",
                            alignItems: "end",
                            height: "12rem",
                        }}
                    >
                        {avio?.colors?.map((combo, index) => (
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
                                    color={getNameById(combo?.idcolor, colors)}
                                    status={getStatus(Number(combo?.idstatus))}
                                    id={{
                                        index,
                                        parentIndex: i,
                                        item: "trimColor",
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
                                    handleNewCombo(ModalTypes.NewTrimColor, i)
                                }
                            >
                                + COLOR
                            </Button>
                        )}
                    </Stack>
                    <Stack />
                </>
            ))}
            {modalType === ModalTypes.NewTrimColor && (
                <NewCombo parentIndex={parentIndex} />
            )}
        </section>
    );
};
