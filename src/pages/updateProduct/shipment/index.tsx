import {
    TableContainer,
    Table,
    TableCell,
    Stack,
    TextField,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboTable } from "./comboTable/ComboTable";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";

const rowStructure = [
    ["Origen", "Cantidad Total"],
    ["Proveedor", "Código de Fábrica"],
];

export const Shipment = () => {
    const { edition } = useAppSelector((state) => state.product);
    return (
        <section>
            <h3>Embarque</h3>
            <div style={{ marginBottom: "50px" }}>
                <TableContainer>
                    <Table>
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
                    </Table>
                </TableContainer>
            </div>
            <Stack rowGap={"40px"}>
                {[...Array(3).keys()].map((index) => (
                    <ComboTable key={index} />
                ))}
            </Stack>
        </section>
    );
};
