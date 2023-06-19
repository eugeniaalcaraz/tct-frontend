import React, { FC, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
type TrimsProps = {
    trimNumber: number;
};

const Trims: FC<TrimsProps> = ({ trimNumber }) => {
    const { trims, avios, colors, errors } = useAppSelector(
        (state) => state.product
    );
    const [open, setOpen] = useState<boolean>(false);
    const [selectedIdColor, setSelectedIdColor] = useState("");
    const [trimColor, setTrimColor] = useState<number[]>([]);
    const [quantity, setQuantity] = useState("");
    const [idAvio, setIdAvio] = useState("");
    const dispatch = useAppDispatch();

    // const selectedTrim = {
    //     1: trimCombos1,
    //     2: trimCombos2,
    //     3: trimCombos3,
    //     4: trimCombos4,
    //     5: trimCombos5,
    //     6: trimCombos6,
    //     7: trimCombos7,
    //     8: trimCombos8,
    //     9: trimCombos9,
    //     10: trimCombos10,
    //     11: trimCombos11,
    //     12: trimCombos12,
    // };

    const openOptions = () => {
        setOpen((prevState) => !prevState);
    };

    const addCombo = () => {
        if (trimColor.length > 0) {
            dispatch(
                handleTrimCombos({
                    trimComboNumber: trimNumber,
                    trimCombo: {
                        idAvio: Number(idAvio),
                        idColors: trimColor,
                        quantity: Number(quantity),
                    },
                })
            );
            setTimeout(() => {
                setOpen(false);
            }, 500);
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
                name={`tipoAvio${trimNumber}`}
                useFormHook={false}
                externalOnChange={(e) => setIdAvio(e.value)}
                selectedValue={idAvio}
            />
            <ControlledInput
                label="Cantidad"
                name={`cantidad${trimNumber}`}
                error={checkIfError("cantidad")}
                helperText={checkErrorMessage("cantidad")}
                useFormhook={false}
                externalOnChange={(e) => setQuantity(e.target.value)}
                externalValue={quantity}
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
                    value={selectedIdColor}
                    multipleSelect={false}
                    onChange={(e) => {
                        setTrimColor((prevState) => [...prevState, e]);
                        setSelectedIdColor(e);
                    }}
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

            {avios[trimNumber] && (
                <Box className="combos">
                    {avios[trimNumber].idColors.map((colorId, i) => (
                        <Box key={colorId} className="combo">
                            <div className="upper-container">
                                Combo {i + 1}
                                <IconButton
                                    aria-label="delete"
                                    // onClick={() =>
                                    //     deleteCombo(selectedColor.idColor)
                                    // }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            <Box
                                sx={{
                                    backgroundColor: `${
                                        colors?.find(
                                            (color) =>
                                                Number(color.Id) === colorId
                                        )?.RGB
                                    }`,
                                }}
                            ></Box>
                        </Box>
                    ))}
                </Box>
            )}
        </FabricContainer>
    );
};

export { Trims };
