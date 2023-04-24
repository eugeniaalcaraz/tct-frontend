import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
    ControlledDropdown,
    ControlledInput,
    Dropdown,
} from "@components/common";
import { Button, Box } from "@mui/material";
import { FabricContainer } from "../MaterialsStyles";

import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { handleTrimCombos } from "@/state/features/product";

const Trims = () => {
    const { trims, colors, trimCombos, errors } = useAppSelector(
        (state) => state.product
    );
    const [open, setOpen] = useState<boolean>(false);
    const [trimColor, setTrimColor] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    const openOptions = () => {
        setOpen((prevState) => !prevState);
    };

    const addCombo = () => {
        if (trimColor.length > 0) {
            dispatch(handleTrimCombos({ idTrimColor: String(trimColor[0]) }));
            setTimeout(() => {
                setOpen(false);
            }, 500);
            setTrimColor([]);
        }
    };

    const checkIfError = (name) => {
        if (errors) {
            return Object.keys(errors).includes(name);
        }
        return false;
    };

    const checkErrorMessage = (name) => {
        if (name.startsWith("composicion", 0)) {
            name = "composicion";
        }
        if (name.startsWith("porcentaje", 0)) {
            name = "porcentaje";
        }
        if (errors) {
            const errorMessage =
                Object.entries(errors).filter((error) => {
                    if (error[0] === name) {
                        return error[1];
                    }
                }) ?? "";

            if (errorMessage && errorMessage.length > 0) {
                return errorMessage[0][1].message;
            }
        }
        return "";
    };

    return (
        <FabricContainer className={checkIfError("cantidad") ? "error" : ""}>
            <h3>Avíos</h3>
            <ControlledDropdown
                label="Tipo"
                options={trims ?? []}
                name="tipoAvio"
            />
            <ControlledInput
                label="Cantidad"
                name="cantidad"
                error={checkIfError("cantidad")}
                helperText={checkErrorMessage("cantidad")}
            />

            <Button
                variant="text"
                type="button"
                color="primary"
                onClick={openOptions}
            >
                + COMBO
            </Button>
            <Box className={`comboBoxTrims ${open && "open"}`}>
                <Dropdown
                    label="Color"
                    options={colors ?? []} // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value={trimColor}
                    onChange={(e) => setTrimColor(e)}
                />

                <Button
                    variant="text"
                    type="button"
                    color="primary"
                    onClick={addCombo}
                >
                    + Agregar
                </Button>
            </Box>
            {trimCombos && trimCombos.length > 0 && (
                <Box className="combos">
                    {trimCombos.map((combo, i) => (
                        <Box key={uuid()} className="combo">
                            <span>Combo {i + 1}</span>
                            <Box className="solid"></Box>
                        </Box>
                    ))}
                </Box>
            )}
        </FabricContainer>
    );
};

export { Trims };
