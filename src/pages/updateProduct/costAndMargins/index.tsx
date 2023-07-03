import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TextField,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { useAppSelector } from "@/state/app/hooks";
import { v4 as uuid } from "uuid";

export const CostAndMargin = () => {
    const { edition, updateProduct } = useAppSelector((state) => state.product);

    const productInfo = updateProduct?.basicInfo[0];

    const rowStructure = [
        [
            { label: "Costo(USD)", data: productInfo?.cost },
            { label: "Precio Venta(USD)", data: productInfo?.costInStore },
            { label: "Precio Tienda($)", data: productInfo?.costInStore * 40 },
        ],
        [
            { label: "Margen", data: "calculo de margen" },
            { label: "Markup", data: "" },
            { label: "", data: "" },
        ],
        [
            { label: "Precio Santander($)", data: "" },
            { label: "Margen Santander($)", data: "" },
            { label: "", data: "" },
        ],
    ];

    return (
        <section>
            <h3>COSTO Y MARGEN</h3>
            <TableContainer>
                <Table>
                    <TableBody>
                        {rowStructure.map((row) => (
                            <StyledTableRow key={uuid()}>
                                {row.map(({ label, data }) => (
                                    <TableCell key={uuid()}>
                                        {label}
                                        {label !== "" && ": "}
                                        {edition && label !== "" ? (
                                            <TextField
                                                id="outlined-read-only-input"
                                                defaultValue={data}
                                                variant="standard"
                                                size="small"
                                                sx={{
                                                    width: "calc(100% - 15rem)",
                                                }}
                                            />
                                        ) : (
                                            <>{data}</>
                                        )}
                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};
