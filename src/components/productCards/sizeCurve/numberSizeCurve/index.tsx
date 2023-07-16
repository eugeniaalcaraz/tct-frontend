import { useAppSelector, useAppDispatch } from "@/state/app/hooks";
import { addTelasArray } from "@/state/features/product";
import { OptionsType } from "@/types";
import { ControlledInput, ControlledDropdown } from "@components/common";
import { Box, Button } from "@mui/material";
import { Container } from "./NumberCurveStyle";

import React, { FC, useEffect, useState } from "react";

type NumberSizeCurveProps = {
    sizes: { Id: string; Description: string }[];
};

export const NumberSizeCurve: FC<NumberSizeCurveProps> = ({ sizes }) => {
    const { telas, mutationSuccess } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    const [updatedSizeValues, setUpdatedSizeValues] = useState(() =>
        sizes.map(({ Id }) => ({ Id, value: "" }))
    );

    const inputOnChange = ({
        valueToUpdate,
        id,
    }: {
        valueToUpdate: string;
        id: string;
    }) => {
        setUpdatedSizeValues((prevState) => {
            return prevState.map((sizeObj) => {
                if (sizeObj.Id === id) {
                    return {
                        ...sizeObj,
                        value: valueToUpdate,
                    };
                }
                return sizeObj;
            });
        });
    };

    const findIndex = (value, array) => {
        return array.findIndex((obj) => obj.Id === value);
    };

    // useEffect(() => {
    //     setUpdatedSizeValues((prevState) => {
    //         return prevState.map((size) => {
    //             const selectedSize = selectedSizes.find(
    //                 (sizeObj) => size.Id === sizeObj.Id
    //             );
    //             if (selectedSize) {
    //                 return size;
    //             }
    //             return { ...size, value: "" };
    //         });
    //     });
    // }, [selectedSizes]);

    const updateSizeCurveArray = (valueToUpdate, arrayTobeUpdated) => {
        return arrayTobeUpdated.map((value) => ({
            ...value,
            sizeCurve: valueToUpdate,
        }));
    };

    useEffect(() => {
        const onlyNumberSizeCurveArr = updatedSizeValues.map((sizeObj) =>
            Number(sizeObj.value)
        );

        const updatedTelasArray = telas.map((tela) => ({
            ...tela,
            colors:
                tela.colors.length > 0
                    ? updateSizeCurveArray(onlyNumberSizeCurveArr, tela.colors)
                    : [],
            prints:
                tela.prints.length > 0
                    ? updateSizeCurveArray(onlyNumberSizeCurveArr, tela.prints)
                    : [],
        }));

        dispatch(addTelasArray(updatedTelasArray));
    }, [updatedSizeValues]);

    useEffect(() => {
        if (mutationSuccess) {
            setUpdatedSizeValues(sizes.map(({ Id }) => ({ Id, value: "" })));
        }
    }, [mutationSuccess]);

    return (
        <Container>
            <span className="label">Piezas por talle</span>
            <Box className="sizes">
                <span className="sizesBoxes">
                    {sizes.map(({ Id }) => (
                        <span key={Id}>
                            <ControlledInput
                                useFormhook={false}
                                disabled={!telas.length}
                                externalOnChange={(e) =>
                                    inputOnChange({
                                        valueToUpdate: e.target.value,
                                        id: Id,
                                    })
                                }
                                externalValue={
                                    updatedSizeValues[
                                        findIndex(Id, updatedSizeValues)
                                    ]?.value
                                }
                                label={Id}
                                name={Id}
                            />
                        </span>
                    ))}
                </span>
            </Box>
        </Container>
    );
};
