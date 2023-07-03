import {
    TableContainer,
    Table,
    TableCell,
    TableBody,
    TextField,
    Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboItem } from "../comboItem";
import { StatusLabel } from "../stateLabel";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";
import StateOptions from "../stateLabel/StateOptions";
import { getNameById, getStatus } from "@/utils";
import dayjs from "dayjs";

export const Materials = () => {
    const { edition, updateProduct, localization, fabrics, colors } =
        useAppSelector((state) => state.product);

    const fabricInfo = updateProduct?.fabrics;

    const rowStructure = [
        [
            { label: "Calidad", data: "description" },
            {
                label: "Composición",
                data: "composition",
            },
        ],
        [
            { label: "Peso", data: "weight" },
            { label: "Consumo", data: "consumption" },
        ],
    ];

    return (
        <section>
            <h3>MATERIALES</h3>
            {fabricInfo?.map((fabric, i) => (
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
                                        {row.map(({ label, data }) => (
                                            <TableCell key={uuid()}>
                                                {label}
                                                {label !== "" && ": "}
                                                {edition && label !== "" ? (
                                                    <TextField
                                                        id="outlined-read-only-input"
                                                        defaultValue={
                                                            label === "Calidad"
                                                                ? getNameById(
                                                                      fabric[
                                                                          data
                                                                      ],
                                                                      fabrics
                                                                  )
                                                                : String(
                                                                      fabric[
                                                                          data
                                                                      ]
                                                                  )
                                                        }
                                                        variant="standard"
                                                        size="small"
                                                        sx={{
                                                            width: "calc(100% - 15rem)",
                                                        }}
                                                    />
                                                ) : (
                                                    <>{String(fabric[data])}</>
                                                )}
                                            </TableCell>
                                        ))}
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
