import React, { useEffect, useState } from "react";
import { ControlledDropdown, ControlledInput } from "@components/common";
import { Button, Checkbox, FormControlLabel, Box } from "@mui/material";
import { Container } from "./SizeCurveStyles";
import { OptionsType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { addTelasArray } from "@/state/features/product";

const sizes = [
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

const SizeCurve = () => {
    const [addSize, setAddSize] = useState<boolean>(false);
    const { telas } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();

    const [selectedSizes, setSelectedSizes] = useState<OptionsType[]>([
        { Id: "XS", Description: "XS" },
        { Id: "S", Description: "S" },
        { Id: "M", Description: "M" },
        { Id: "L", Description: "L" },
        { Id: "XL", Description: "XL" },
    ]);

    const [updatedSizeValues, setUpdatedSizeValues] = useState([
        { Id: "U", value: "" },
        { Id: "XXS", value: "" },
        { Id: "XS", value: "" },
        { Id: "S", value: "" },
        { Id: "M", value: "" },
        { Id: "L", value: "" },
        { Id: "XL", value: "" },
        { Id: "XXL", value: "" },
        { Id: "3XL", value: "" },
        { Id: "4XL", value: "" },
        { Id: "5XL", value: "" },
        { Id: "6XL", value: "" },
    ]);

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

    const handleBlur = (e) => {
        setAddSize(false);
        const values = e.target.value;
        setSelectedSizes(
            values.map((value) => ({ Id: value, Description: value }))
        );
    };

    const isIncludded = (inputValue) => {
        if (selectedSizes.find(({ Id }) => Id === inputValue)) {
            return "visible";
        }
        return "hidden";
    };

    const findIndex = (value, array) => {
        return array.findIndex((obj) => obj.Id === value);
    };

    useEffect(() => {
        setUpdatedSizeValues((prevState) => {
            return prevState.map((size) => {
                const selectedSize = selectedSizes.find(
                    (sizeObj) => size.Id === sizeObj.Id
                );
                if (selectedSize) {
                    return size;
                }
                return { ...size, value: "" };
            });
        });
    }, [selectedSizes]);

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

    return (
        <Container>
            <span className="label">Piezas por talle</span>
            <Box className="sizes">
                <span className="sizesBoxes">
                    {sizes.map(({ Id }) => (
                        <span key={Id} className={isIncludded(Id)}>
                            <ControlledInput
                                useFormhook={false}
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
                <Button
                    variant="text"
                    type="button"
                    color="primary"
                    onClick={() => setAddSize(true)}
                >
                    + AGREGAR TALLE
                </Button>
            </Box>

            <Box className={`sizesWrapper ${addSize && "addSize"}`}>
                <ControlledDropdown
                    label="Talles"
                    options={sizes}
                    name="selectedSizes"
                    multipleSelect
                    onBlur={(e) => handleBlur(e)}
                />
            </Box>

            {/* <Box className="packs">
                <span className="label">Packs por caja</span>
                <ControlledDropdown
                    label=""
                    options={[
                        { Id: "1", Description: 1 },
                        { Id: "2", Description: 2 },
                        { Id: "3", Description: 3 },
                        { Id: "4", Description: 4 },
                        { Id: "5", Description: 5 },
                    ]}
                    name="packs"
                />
            </Box> */}
            {/* <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Repetir curva para todos los embarques"
            /> */}
        </Container>
    );
};

export { SizeCurve };
