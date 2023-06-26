import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TextField,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../../UpdateProductStyles";
import { useAppSelector } from "@/state/app/hooks";
import { v4 as uuid } from "uuid";

const rowStructure = [
    ["Destino", "Embarque", "Cantidad"],
    ["Fecha de embarque", "Ingreso Depósito", "Ingreso Tienda"],
];

export const ComboTable = () => {
    const { edition } = useAppSelector((state) => state.product);
    return (
        <div>
            <div style={{ fontWeight: "400", lineHeight: "19px" }}>Combo 1</div>
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
        </div>
    );
};
