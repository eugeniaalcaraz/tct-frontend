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
import { UpdateInput } from "../updateDropdowns";
import styles from "./CostAndMargins.module.css";

export const CostAndMargin = () => {
    const { edition } = useAppSelector((state) => state.product);
    const { cost, costInStore } = useAppSelector(
        (state) => state.updatedProduct
    );

    const rowStructure = [
        [
            { label: "Costo($)", data: cost, name: "cost" },
            {
                label: "Precio Venta($)",
                data: costInStore,
                name: "costInStore",
            },
            //{ label: "Precio Tienda($)", data: costInStore * 40, name: "" },
            { label: "", data: "", name: "" },
        ],
        [
            { label: "Margen", data: "calculo de margen", name: "" },
            {
                label: "Precio Santander($)",
                data: costInStore * 0.85,
                name: "",
            },
            { label: "Margen Santander($)", data: "", name: "" },
        ],
    ];

    return (
        <section className={styles.section}>
            <h3>COSTO Y MARGEN</h3>
            <TableContainer>
                <Table>
                    <TableBody>
                        {rowStructure.map((row, i) => (
                            <StyledTableRow key={uuid()}>
                                {row.map(({ label, data, name }) => (
                                    <TableCell key={uuid()}>
                                        {edition ? (
                                            <span
                                                style={{
                                                    display: "inline-block",
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
                                        {edition && label !== "" && i === 0 ? (
                                            <UpdateInput
                                                value={data}
                                                name={name}
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
