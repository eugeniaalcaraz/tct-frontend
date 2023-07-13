import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TextField,
} from "@mui/material";
import React, { FC, useEffect } from "react";
import { StyledTableRow } from "../../UpdateProductStyles";
import { useAppSelector } from "@/state/app/hooks";
import { v4 as uuid } from "uuid";
import { Fabrics } from "@/types";
import { getNameById, getCountryById, getTypeOfShipmentById } from "@/utils";
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
                data: getCountryById(combo?.idCountryDestination, countries),
                name: "idCountryDestination",
                options: countries?.map(({ Id, Name }) => ({
                    Id: String(Id),
                    Description: Name,
                })),
                select: true,
            },
            {
                label: "Embarque",
                data: getTypeOfShipmentById(combo?.idShipping, typeOfshipment),
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
    ];

    useEffect(() => {
        combo;
    }, [combo]);

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
                                                        name={name}
                                                    />
                                                ) : (
                                                    <UpdateInput
                                                        value={data}
                                                        name={name}
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
