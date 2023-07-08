import { TableContainer, Table, TableCell, Stack } from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboTable } from "./comboTable/ComboTable";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";
import { getNameById, getSupplierById } from "@/utils";
import { UpdateDropdown, UpdateInput } from "../updateDropdowns";

export const Shipment = () => {
    const { edition, countries, supplier } = useAppSelector(
        (state) => state.product
    );
    const updateData = useAppSelector((state) => state.updatedProduct);

    const comboInfo = updateData?.telas;

    const rowStructure = [
        [
            {
                label: "Origen",
                data: getNameById(updateData?.idCountry, countries),
                name: "idCountry",
                select: true,
                options: countries,
            },
            {
                label: "Cantidad Total",
                data: updateData?.quantity,
                name: "quantity",
                select: false,
                options: [],
            },
        ],
        [
            {
                label: "Proveedor",
                data: getSupplierById(updateData?.idSupplier, supplier),
                name: "idSupplier",
                select: true,
                options: supplier?.map(({ Id, Name, Lastname }) => ({
                    Id: String(Id),
                    Description: `${Name} ${Lastname}`,
                })),
            },
            {
                label: "Código de Fábrica",
                data: updateData?.fabricCode,
                name: "fabricCode",
                select: false,
                options: [],
            },
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
                                {row.map(
                                    ({
                                        label,
                                        data,
                                        name,
                                        select,
                                        options,
                                    }) => (
                                        <TableCell key={uuid()}>
                                            {label}
                                            {label !== "" && ": "}
                                            {edition && label !== "" ? (
                                                select ? (
                                                    <UpdateDropdown
                                                        value={updateData[name]}
                                                        options={options}
                                                        name={name}
                                                    />
                                                ) : (
                                                    <UpdateInput
                                                        value={updateData[data]}
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
                    </Table>
                </TableContainer>
            </div>
            <Stack rowGap={"40px"}>
                {comboInfo?.map((combo, index) => (
                    <ComboTable key={uuid()} number={index + 1} combo={combo} />
                ))}
            </Stack>
        </section>
    );
};
