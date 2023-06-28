import {
    TableContainer,
    Table,
    TableCell,
    TableBody,
    TextField,
    Stack,
} from "@mui/material";
import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import { ComboItem } from "../comboItem";
import { StatusLabel } from "../stateLabel";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";

/*
"telas": [
        {
            "idFabric": "0",
            "idStatus": 1,
            "description": "nombre fabir",
            "consumption": 40,
            "weight": "500",
            "placement": 1,
            "composition": [
                {
                    "idFiber": 1,
                    "percentage": 100
                }
            ],
            "colors": [
                {
                    "idColor": 1,
                    "sizeCurve": [
                        0,
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "idStatus": 1
                }
            ],
            "prints": [
                {
                    "nombre": "estampa nombre",
                    "cantidadColor": "2",
                    "sizeCurve": [
                        0,
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    "idStatus": 1
                }
            ],
            "entryDate": "2023-07-28",
            "shippingDate": "2023-07-29",
            "warehouseEntryDate": "2023-07-16",
            "idCountryDestination": 1,
            "idShipping": 1,
            "quantity": 45
        }

*/

const rowStructure = [
    [
        { label: "Calidad", data: "description" },
        {
            label: "Composición",
            data: "composition.map(({idFiber, percentage})=> `${getFiberById(idFiber)} ${percentage}`))",
        },
    ],
    [
        { label: "Peso", data: "weight" },
        { label: "Consumo", data: "consumption" },
    ],
];

export const Materials = () => {
    const { edition } = useAppSelector((state) => state.product);
    return (
        <section>
            <h3>MATERIALES</h3>
            {/*TODO telas.map((tela)=> <div key={index} style={{ margin: "40px 0" }}>
                    <div>
                        <div>{"getPlacementById(placement)"}</div>
                        <Stack
                            direction={"row"}
                            gap={"7px"}
                            style={{
                                alignItems: "center",
                                marginTop: "8px",
                                marginBottom: "40px",
                            }}
                        >
                            <StatusLabel status={"reprobado"} />
                            <div>fechaEstadoCalidad</div>
                        </Stack>
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
                    <Stack
                        direction={"row"}
                        gap={"15px"}
                        sx={{ padding: "20px 0", flexWrap: "wrap" }}
                    >
                        {TODO colors.map(({idColor, idStatus}, index)=> (<div
                                key={uuid()}
                                style={{
                                    marginRight: "5rem",
                                    padding: "0 2rem",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ComboItem combo={index} color={getColorById(idColor)} status={getStatusById(idStatus)} />
                            </div>)) }
                        {[...Array(5).keys()].map((index) => (
                            <div
                                key={uuid()}
                                style={{
                                    marginRight: "5rem",
                                    padding: "0 2rem",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ComboItem
                                    combo={index}
                                    color="#DBC4D2"
                                    status="Approved"
                                />
                            </div>
                        ))}
                        {TODO prints.map(({nombre, cantidadColor, idStatus}, index)=> (<div
                                key={uuid()}
                                style={{
                                    marginRight: "5rem",
                                    padding: "0 2rem",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ComboItem combo={index} color={getColorById(idColor)} status={getStatusById(idStatus)} name={nombre} colorCount={cantidadColor} />
                            </div>)) }
                    </Stack>
                </div> */}
            {[...Array(3).keys()].map((index) => (
                <div key={index} style={{ margin: "40px 0" }}>
                    <div>
                        <div>{"getPlacementById(placement)"}</div>
                        <Stack
                            direction={"row"}
                            gap={"7px"}
                            style={{
                                alignItems: "center",
                                marginTop: "8px",
                                marginBottom: "40px",
                            }}
                        >
                            <StatusLabel status={"reprobado"} />
                            <div>fechaEstadoCalidad</div>
                        </Stack>
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
                    <Stack
                        direction={"row"}
                        gap={"15px"}
                        sx={{ padding: "20px 0", flexWrap: "wrap" }}
                    >
                        {[...Array(5).keys()].map((index) => (
                            <div
                                key={uuid()}
                                style={{
                                    marginRight: "5rem",
                                    padding: "0 2rem",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ComboItem
                                    combo={index + 1}
                                    color="#DBC4D2"
                                    status="Approved"
                                />
                            </div>
                        ))}
                    </Stack>
                </div>
            ))}
        </section>
    );
};
