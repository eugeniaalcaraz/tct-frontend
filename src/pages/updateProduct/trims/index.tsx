import React from "react";
import { StyledTableRow } from "../UpdateProductStyles";
import {
    TableContainer,
    Table,
    TableCell,
    Stack,
    TextField,
} from "@mui/material";
import { ComboItem } from "../comboItem";
import { StatusLabel } from "../stateLabel";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";

// "avios": [
//     {
//         "idAvio": 1,
//         "idStatus": 1,
//         "idColor": 1,
//         "quantity": 34,
//         "idShipping": "",
//         "idCountryDestination": "",
//         "shippingDate": "",
//         "entryDate": "",
//         "warehouseEntryDate": "",
//         "colors": [
//             {
//                 "idColor": 1,
//                 "idStatus": 1
//             }
//         ]
//     }
// ],

const rowStructure = [
    [
        { label: "Tipo", data: "getTrimById(idAvio)" },
        { label: "Cantidad", data: "quantity" },
    ],
];

export const Trims = () => {
    const { edition } = useAppSelector((state) => state.product);
    return (
        <section>
            <h3>AVÍOS</h3>
            {/* TODO avios.map((avio)=><>      <TableContainer>
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
            <Stack
                direction={"row"}
                gap={"15px"}
                sx={{ padding: "20px 0", flexWrap: "wrap" }}
            >
                {[...Array(5).keys()].map((index) => (
                    <div
                        key={index}
                        style={{
                            marginRight: "5rem",
                            padding: "0 2rem",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <ComboItem key={index} />
                    </div>
                ))}
            </Stack>
            <Stack /></>) */}
            <Stack
                direction={"row"}
                gap={"7px"}
                style={{
                    alignItems: "center",
                    marginTop: "8px",
                    marginBottom: "40px",
                }}
            >
                <StatusLabel status={"aprobado"} />
                <div>fechaEstadoCalidad</div>
            </Stack>
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
            <Stack
                direction={"row"}
                gap={"15px"}
                sx={{ padding: "20px 0", flexWrap: "wrap" }}
            >
                {/* TODO avios.colors.map(({idColor, idStatus},index)=> <div
                        key={index}
                        style={{
                            marginRight: "5rem",
                            padding: "0 2rem",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <ComboItem combo={index} color={getColorById(idColor)} status={getStatusById(idStatus)/>
                    </div>) */}
                {[...Array(5).keys()].map((index) => (
                    <div
                        key={index}
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
                            color="#E9CE67"
                            status="Pending"
                        />
                    </div>
                ))}
            </Stack>
            <Stack />
        </section>
    );
};
