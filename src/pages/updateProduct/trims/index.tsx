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
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";

const rowStructure = [["Tipo", "Cantidad"]];

export const Trims = () => {
    const { edition } = useAppSelector((state) => state.product);
    return (
        <section>
            <h3>Avíos</h3>
            <TableContainer>
                <Table>
                    {rowStructure.map((row) => (
                        <StyledTableRow key={uuid()}>
                            {row.map((cell) => (
                                <TableCell key={uuid()}>
                                    {cell}
                                    {cell !== "" && ": "}
                                    {edition && cell !== "" ? (
                                        <TextField
                                            id="outlined-read-only-input"
                                            defaultValue={cell}
                                            variant="standard"
                                            size="small"
                                            sx={{
                                                width: "calc(100% - 15rem)",
                                            }}
                                        />
                                    ) : (
                                        <>{cell}</>
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
            <Stack />
        </section>
    );
};
