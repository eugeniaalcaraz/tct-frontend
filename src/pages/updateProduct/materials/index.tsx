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

export const Materials = () => {
    const { edition, updateProduct, localization, fabrics, colors } =
        useAppSelector((state) => state.product);

    const fabricInfo = updateProduct?.fabrics;
    const combos = updateProduct?.comboFabricColors[0];
    const prints = updateProduct?.comboFabricPrints[0];

    const rowStructure = [
        [
            { label: "Calidad", data: "description" },
            {
                label: "Composición",
                data: "",
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
            {fabricInfo?.map((fabric) => (
                <div key={uuid()} style={{ margin: "40px 0" }}>
                    <div>
                        <div>
                            {getNameById(fabric?.idplacement, localization)}
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
                                status={getStatus(fabric?.idstatus)}
                            />
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
                                                                : fabric[data]
                                                        }
                                                        variant="standard"
                                                        size="small"
                                                        sx={{
                                                            width: "calc(100% - 15rem)",
                                                        }}
                                                    />
                                                ) : (
                                                    <>{fabric[data]}</>
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
                        {combos?.map(
                            (combo, index) =>
                                fabric?.id === combo?.idComboFabric && (
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
                                            color={getNameById(
                                                combo?.idColor,
                                                colors
                                            )}
                                            status={getStatus(combo?.idStatus)}
                                        />
                                    </div>
                                )
                        )}
                        {prints?.map(
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
                                            combo={index + 1}
                                            color={"purple"}
                                            status={getStatus(print?.idStatus)}
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
