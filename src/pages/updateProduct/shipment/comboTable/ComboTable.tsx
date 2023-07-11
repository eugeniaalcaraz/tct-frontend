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
import { UpdateDropdown, UpdateInput } from "../../updateDropdowns";

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
                name: "idCountryDestination",
                options: countries,
                select: true,
            },
            {
                label: "Embarque",
                data: getNameById(combo?.idShipping, typeOfshipment),
                name: "idShipping",
                options: typeOfshipment,
                select: true,
            },
            {
                label: "Cantidad",
                data: combo?.quantity,
                name: "quantity",
                select: false,
                options: [],
            },
        ],
        // [
        //     {
        //         label: "Fecha de embarque",
        //         data: dayjs(combo?.shippinDate).format("YYYY-MM-DD"),
        //         name:"shippinDate"
        //     },
        //     {
        //         label: "Ingreso Depósito",
        //         data: dayjs(combo?.warehouseEntryDate).format("YYYY-MM-DD"),
        //     },
        //     {
        //         label: "Ingreso Tienda",
        //         data: dayjs(combo?.entryDate).format("YYYY-MM-DD"),
        //     },
        //],
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
                                {row.map(
                                    ({
                                        label,
                                        data,
                                        name,
                                        select,
                                        options,
                                    }) => (
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
                                            {edition && label !== "" ? (
                                                select ? (
                                                    <UpdateDropdown
                                                        value={combo[name]}
                                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                        // @ts-ignore
                                                        options={options}
                                                        name={`${combo}-${name}`}
                                                    />
                                                ) : (
                                                    <UpdateInput
                                                        value={combo[data]}
                                                        name={`${combo}-${name}`}
                                                    />
                                                )
                                            ) : (
                                                <>{data}</>
                                            )}
                                        </TableCell>
                                    )
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
