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
import { getNameById, getSupplierById } from "@/utils";

export const Shipment = () => {
    const { edition, updateProduct, countries, supplier } = useAppSelector(
        (state) => state.product
    );

    const productInfo = updateProduct?.basicInfo[0];
    const comboInfo = updateProduct?.fabrics;

    const rowStructure = [
        [
            {
                label: "Origen",
                data: getNameById(productInfo?.idCountry, countries),
            },
            { label: "Cantidad Total", data: productInfo?.quantity },
        ],
        [
            {
                label: "Proveedor",
                data: getSupplierById(productInfo?.idSupplier, supplier),
            },
            { label: "Código de Fábrica", data: productInfo?.fabricCode },
        ],
    ];

    return (
        <section>
            <h3>EMBARQUE</h3>
            <div style={{ marginBottom: "50px" }}>
                <TableContainer>
                    <Table>
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
                    </Table>
                </TableContainer>
            </div>
            {/* TODO telas.map((tela)=>) */}
            <Stack rowGap={"40px"}>
                {comboInfo?.map((combo, index) => (
                    <ComboTable key={uuid()} number={index + 1} combo={combo} />
                ))}
            </Stack>
        </section>
    );
};
