import {
    TableContainer,
    Table,
    TableCell,
    TableBody,
    TextField,
    Stack,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboItem } from "../comboItem";
import { StatusLabel } from "../stateLabel";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";

const rowStructure = [
    ["Calidad", "Composición"],
    ["Peso", "Consumo"],
];

export const Materials = () => {
    const { edition } = useAppSelector((state) => state.product);
    return (
        <section>
            <h3>Materiales</h3>
            {[...Array(3).keys()].map((index) => (
                <div key={index} style={{ margin: "40px 0" }}>
                    <div>
                        <div>{"{LOCALIZACION DE PRENDA}"}</div>
                        <Stack
                            direction={"row"}
                            gap={"7px"}
                            style={{
                                alignItems: "center",
                                marginTop: "8px",
                                marginBottom: "40px",
                            }}
                        >
                            <StatusLabel status={"reprobado"} />
                            <div>fechaEstadoCalidad</div>
                        </Stack>
                    </div>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {rowStructure.map((row) => (
                                    <StyledTableRow key={uuid()}>
                                        {row.map((cell) => (
                                            <TableCell key={uuid()}>
                                                {cell}
                                                {cell !== "" && ": "}
                                                {edition && cell !== "" ? (
                                                    <TextField
                                                        id="outlined-read-only-input"
                                                        defaultValue={cell}
                                                        variant="standard"
                                                        size="small"
                                                        sx={{
                                                            width: "calc(100% - 15rem)",
                                                        }}
                                                    />
                                                ) : (
                                                    <>{cell}</>
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
                        {[...Array(5).keys()].map((index) => (
                            <div
                                key={index}
                                style={{
                                    marginRight: "5rem",
                                    padding: "0 2rem",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ComboItem />
                            </div>
                        ))}
                    </Stack>
                </div>
            ))}
        </section>
    );
};
