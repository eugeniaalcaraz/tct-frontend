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
import { Fabrics } from "@/types";
import { getNameById } from "@/utils";
import dayjs from "dayjs";

type ComboTableProps = {
    number: number;
    combo: Fabrics;
};

export const ComboTable: FC<ComboTableProps> = ({ number, combo }) => {
    const { edition, countries, typeOfshipment } = useAppSelector(
        (state) => state.product
    );

    const rowStructure = [
        [
            {
                label: "Destino",
                data: getNameById(combo?.idCountryDestination, countries),
            },
            {
                label: "Embarque",
                data: getNameById(combo?.idShipping, typeOfshipment),
            },
            { label: "Cantidad", data: combo?.quantity },
        ],
        [
            {
                label: "Fecha de embarque",
                data: dayjs(combo?.shippinDate).format("YYYY-MM-DD"),
            },
            {
                label: "Ingreso Depósito",
                data: dayjs(combo?.warehouseEntryDate).format("YYYY-MM-DD"),
            },
            {
                label: "Ingreso Tienda",
                data: dayjs(combo?.entryDate).format("YYYY-MM-DD"),
            },
        ],
    ];

    return (
        <div>
            <div style={{ fontWeight: "400", lineHeight: "19px" }}>
                Combo {number}
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
