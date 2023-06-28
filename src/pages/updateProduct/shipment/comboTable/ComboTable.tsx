import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TextField,
} from "@mui/material";
import React, { FC } from "react";
import { StyledTableRow } from "../../UpdateProductStyles";
import { useAppSelector } from "@/state/app/hooks";
import { v4 as uuid } from "uuid";

// "entryDate": "2023-07-28",
// "shippingDate": "2023-07-29",
// "warehouseEntryDate": "2023-07-16",
// "idCountryDestination": 1,
// "idShipping": 1,
// "quantity": 45

const rowStructure = [
    [
        { label: "Destino", data: "getCountryById(idCountryDestination)" },
        { label: "Embarque", data: "getShipmentById(idShipping)" },
        { label: "Cantidad", data: "quantity" },
    ],
    [
        { label: "Fecha de embarque", data: "shippingDate" },
        { label: "Ingreso Depósito", data: "warehouseEntryDate" },
        { label: "Ingreso Tienda", data: "entryDate" },
    ],
];

type ComboTableProps = {
    combo: number;
    embarque?: unknown;
};

export const ComboTable: FC<ComboTableProps> = ({ combo }) => {
    const { edition } = useAppSelector((state) => state.product);
    return (
        <div>
            <div style={{ fontWeight: "400", lineHeight: "19px" }}>
                Combo {combo}
            </div>
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
        </div>
    );
};
