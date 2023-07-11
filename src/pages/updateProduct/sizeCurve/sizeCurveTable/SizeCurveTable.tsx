import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setData } from "@/state/features/updatedProduct";
import { useIconsContext } from "@components/hooks";

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
    const { edition } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const { icons } = useIconsContext();
    const initialValue = 0;
    const curveSumary = curve.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );
    const summary = curve.reduce(
        (accumulator, currentValue) =>
            accumulator +
            Math.round((quantityOfCombo / curveSumary) * currentValue),
        initialValue
    );

    const getSizes = () => {
        switch (type) {
            case 1:
                return (
                    <>
                        {clothes.map(({ Description }, index) =>
                            edition ? (
                                curve[index] > 0 ? (
                                    <TableCell key={uuid()} align="center">
                                        {Description}
                                    </TableCell>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <TableCell key={uuid()} align="center">
                                    {Description}
                                </TableCell>
                            )
                        )}
                    </>
                );
            case 2:
                return (
                    <>
                        {denim.map((size) => (
                            <TableCell key={uuid()} align="center">
                                {size}
                            </TableCell>
                        ))}
                    </>
                );
            default:
                return (
                    <>
                        {shoes.map((size) => (
                            <TableCell key={uuid()} align="center">
                                {size}
                            </TableCell>
                        ))}
                    </>
                );
        }
    };

    const getFields = () => {
        let sizes: { Id: string; Description: string }[] | string[] = [];

        switch (type) {
            case 1:
                sizes = clothes;
                break;
            case 2:
                sizes = denim;
                break;
            case 3:
                sizes = shoes;
                break;
        }

        return (
            <>
                {sizes.map((_, index) => (
                    <TableCell key={uuid()} align="center">
                        <TextField
                            onBlur={(e) => handleChange(e, index)}
                            defaultValue={curve[index] ?? 0}
                            size="small"
                            sx={{
                                width: 40,
                            }}
                        />
                    </TableCell>
                ))}
            </>
        );
    };

    const getQuantityPerSize = () => {
        return (
            <>
                {curve.map((size) =>
                    size > 0 ? (
                        <TableCell key={uuid()} align="center">
                            {Math.round((quantityOfCombo / curveSumary) * size)}
                        </TableCell>
                    ) : (
                        <TableCell key={uuid()}></TableCell>
                    )
                )}
            </>
        );
    };

    const handleChange = (e, position) => {
        const newCurve = curve.slice();
        newCurve[position] = Number(e.target.value);
        dispatch(setData({ curve: newCurve }));
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
                        {edition
                            ? getFields()
                            : curve.map((size) =>
                                  size > 0 ? (
                                      <TableCell key={uuid()} align="center">
                                          {size}
                                      </TableCell>
                                  ) : (
                                      <TableCell key={uuid()}></TableCell>
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
                        <TableCell>
                            {quantityOfCombo}{" "}
                            {edition && summary !== quantityOfCombo && (
                                <Tooltip
                                    title={
                                        <Typography variant="body2">{`La cantidad y la sumatoria de la curva no coinciden, sugerimos revisar.`}</Typography>
                                    }
                                    placement="right"
                                    arrow
                                >
                                    <div
                                        style={{
                                            display: "inline-block",
                                            verticalAlign: "inherit",
                                            marginLeft: "1rem",
                                        }}
                                    >
                                        {icons["alert"]}
                                    </div>
                                </Tooltip>
                            )}
                        </TableCell>
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

/*
 <Tooltip
                        title="Promedio basado
                    en estado de los productos
                    y dias restantes para 
                    el embarque de los mismos"
                        placement="left"
                        arrow
                    >
                        <div>{icons["info"]}</div>
                    </Tooltip>
*/
