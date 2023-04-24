import React, { useState } from "react";
import { ControlledDropdown, ControlledInput } from "@components/common";
import { Button, Checkbox, FormControlLabel, Box } from "@mui/material";
import { Container } from "./SizeCurveStyles";
import { OptionsType } from "@/types";

const sizes = [
    { Id: "XXS", Description: "XXS" },
    { Id: "XS", Description: "XS" },
    { Id: "S", Description: "S" },
    { Id: "M", Description: "M" },
    { Id: "L", Description: "L" },
    { Id: "XL", Description: "XL" },
    { Id: "XXL", Description: "XXL" },
    { Id: "3XL", Description: "3XL" },
    { Id: "4XL", Description: "4XL" },
];

const SizeCurve = () => {
    const [addSize, setAddSize] = useState<boolean>(false);
    const [selectedSizes, setSelectedSizes] = useState<OptionsType[]>([
        { Id: "XS", Description: "XS" },
        { Id: "S", Description: "S" },
        { Id: "M", Description: "M" },
        { Id: "L", Description: "L" },
        { Id: "XL", Description: "XL" },
    ]);

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

    return (
        <Container>
            <span className="label">Piezas por talle</span>
            <Box className="sizes">
                <span className="sizesBoxes">
                    {sizes.map(({ Id }) => (
                        <span key={Id} className={isIncludded(Id)}>
                            <ControlledInput label={Id} name={Id} />
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

            <Box className="packs">
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
            </Box>
            <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Repetir curva para todos los embarques"
            />
        </Container>
    );
};

export { SizeCurve };
