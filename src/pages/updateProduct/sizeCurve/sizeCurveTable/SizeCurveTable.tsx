import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import React, { FC } from "react";

type SizeCurveTableProps = {
    combo: number;
    curve: number[];
    type: number;
    quantityOfCombo: number;
};

const clothes = [
    { Id: "U", Description: "U" },
    { Id: "XXS", Description: "XXS" },
    { Id: "XS", Description: "XS" },
    { Id: "S", Description: "S" },
    { Id: "M", Description: "M" },
    { Id: "L", Description: "L" },
    { Id: "XL", Description: "XL" },
    { Id: "XXL", Description: "XXL" },
    { Id: "3XL", Description: "3XL" },
    { Id: "4XL", Description: "4XL" },
    { Id: "5XL", Description: "5XL" },
    { Id: "6XL", Description: "6XL" },
];

const shoes = ["35", "36", "37", "38", "39", "40"];
const denim = ["24", "26", "28", "30", "32", "34", "36", "38"];

export const SizeCurveTable: FC<SizeCurveTableProps> = ({
    combo,
    curve,
    type,
    quantityOfCombo,
}) => {
    const initialValue = 0;
    const curveSumary = curve.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );

    const getSizes = () => {
        switch (type) {
            case 1:
                return (
                    <>
                        {clothes.map(({ Description }, index) =>
                            curve[index] > 0 ? (
                                <TableCell key={uuid()}>
                                    {Description}
                                </TableCell>
                            ) : (
                                <></>
                            )
                        )}
                    </>
                );
            case 2:
                return (
                    <>
                        {denim.map((size) => (
                            <TableCell key={uuid()}>{size}</TableCell>
                        ))}
                    </>
                );
            default:
                return (
                    <>
                        {shoes.map((size) => (
                            <TableCell key={uuid()}>{size}</TableCell>
                        ))}
                    </>
                );
        }
    };

    const getQuantityPerSize = () => {
        return (
            <>
                {curve.map((size) =>
                    size > 0 ? (
                        <TableCell key={uuid()}>
                            {(quantityOfCombo / curveSumary) * size}
                        </TableCell>
                    ) : (
                        <></>
                    )
                )}
            </>
        );
    };

    return (
        <TableContainer sx={{ maxWidth: "70%" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            TALLES
                        </TableCell>
                        {getSizes()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Curva:
                        </TableCell>
                        {curve.map((size) =>
                            size > 0 ? (
                                <TableCell key={uuid()}>{size}</TableCell>
                            ) : (
                                <></>
                            )
                        )}
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Cantidad:
                        </TableCell>
                        {getQuantityPerSize()}
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Sumatoria:
                        </TableCell>
                        <TableCell>{quantityOfCombo}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};
