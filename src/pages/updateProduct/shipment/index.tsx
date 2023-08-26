import {
    TableContainer,
    Table,
    TableCell,
    Stack,
    TableBody,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboTable } from "./comboTable/ComboTable";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";
import {
    getCountryById,
    getSupplierById,
    getTypeOfShipmentById,
} from "@/utils";
import { UpdateDropdown, UpdateInput } from "../updateDropdowns";

export const Shipment = () => {
    const { edition, countries, supplier, typeOfshipment } = useAppSelector(
        (state) => state.product
    );
    const updateData = useAppSelector((state) => state.updatedProduct);

    const comboInfo = updateData?.telas;

    const rowStructure = [
        [
            {
                label: "Origen",
                data: getCountryById(updateData?.idCountry, countries),
                name: "idCountry",
                select: true,
                options: countries?.map(({ Id, Name }) => ({
                    Id: String(Id),
                    Description: Name,
                })),
            },
            {
                label: "Destino",
                data: getCountryById(
                    comboInfo[0]?.idCountryDestination,
                    countries
                ),
                name: "idCountryDestination",
                options: countries?.map(({ Id, Name }) => ({
                    Id: String(Id),
                    Description: Name,
                })),
                select: true,
            },
            {
                label: "Embarque",
                data: getTypeOfShipmentById(
                    comboInfo[0]?.idShipping,
                    typeOfshipment
                ),
                name: "idShipping",
                options: typeOfshipment,
                select: true,
            },
        ],
        [
            {
                label: "Cantidad Total",
                data: updateData?.quantity,
                name: "quantity",
                select: false,
                options: [],
            },
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
                                                            display:
                                                                "inline-block",
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
                                                            value={
                                                                name ===
                                                                    "idShipping" ||
                                                                name ===
                                                                    "idCountryDestination"
                                                                    ? comboInfo[0][
                                                                          name
                                                                      ]
                                                                    : updateData[
                                                                          name
                                                                      ]
                                                            }
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
            {/* <Stack rowGap={"40px"}>
                {comboInfo?.map((combo, index) => (
                    <ComboTable key={uuid()} number={index + 1} combo={combo} />
                ))}
            </Stack> */}
        </section>
    );
};
