import React, { FC, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
    ControlledDropdown,
    ControlledInput,
    Dropdown,
} from "@components/common";
import { Button, Box } from "@mui/material";
import { FabricContainer } from "../MaterialsStyles";

import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import {
    handleTrimCombos,
    removeReduxError,
    setReduxErrors,
} from "@/state/features/product";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    checkIfError,
    checkErrorMessage,
} from "@/pages/newProduct/aux/errorValidation";
import { useFormContext } from "react-hook-form";
type TrimsProps = {
    trimNumber: number;
};

const Trims: FC<TrimsProps> = ({ trimNumber }) => {
    const { trims, avios, colors, reduxErrors } = useAppSelector(
        (state) => state.product
    );
    const [open, setOpen] = useState<boolean>(false);
    const [selectedIdColor, setSelectedIdColor] = useState("");
    const [trimColor, setTrimColor] = useState<number>(0);
    const [quantity, setQuantity] = useState("");
    const [idAvio, setIdAvio] = useState("");
    const dispatch = useAppDispatch();
    const {
        formState: { isSubmitting },
    } = useFormContext();

    const openOptions = () => {
        setOpen((prevState) => !prevState);
    };

    const addCombo = () => {
        dispatch(
            handleTrimCombos({
                trimComboNumber: trimNumber,
                trimCombo: {
                    idAvio: Number(idAvio),
                    idStatus: 1,
                    quantity: Number(quantity),
                    idShipping: "",
                    idCountryDestination: "",
                    shippingDate: "",
                    entryDate: "",
                    warehouseEntryDate: "",
                    colors: [{ idColor: trimColor, idStatus: 1 }],
                },
            })
        );
        dispatch(removeReduxError(`comboAvio-${trimNumber}`));
        setTimeout(() => {
            setOpen(false);
        }, 500);
    };

    useEffect(() => {
        if (isSubmitting) {
            if (idAvio === "") {
                dispatch(
                    setReduxErrors({
                        idError: `tipoAvio-${trimNumber}`,
                        msg: "Requerido",
                    })
                );
            }

            if (quantity === "") {
                dispatch(
                    setReduxErrors({
                        idError: `cantidadAvio-${trimNumber}`,
                        msg: "Requerido",
                    })
                );
            }
            if (selectedIdColor === "") {
                dispatch(
                    setReduxErrors({
                        idError: `comboAvio-${trimNumber}`,
                        msg: "Combo Requerido",
                    })
                );
            }
        }
    }, [isSubmitting]);

    return (
        <FabricContainer
            className={
                checkIfError(`tipoAvio-${trimNumber}`, reduxErrors)
                    ? "error"
                    : ""
            }
        >
            <h3>Avíos</h3>
            <ControlledDropdown
                label="Tipo"
                options={trims ?? []}
                name={`tipoAvio-${trimNumber}`}
                error={checkIfError(`tipoAvio-${trimNumber}`, reduxErrors)}
                helperText={checkErrorMessage(
                    `tipoAvio-${trimNumber}`,
                    reduxErrors
                )}
                // useFormHook={false}
                onBlur={(e) => {
                    console.log(e.target.value);

                    if (e.target.value !== "") {
                        setIdAvio(e.target.value);
                        dispatch(removeReduxError(`tipoAvio-${trimNumber}`));
                    }
                }}
                // selectedValue={idAvio}
            />
            <ControlledInput
                label="Cantidad"
                name={`cantidadAvio-${trimNumber}`}
                error={checkIfError(`cantidadAvio-${trimNumber}`, reduxErrors)}
                helperText={checkErrorMessage(
                    `cantidadAvio-${trimNumber}`,
                    reduxErrors
                )}
                // useFormhook={false}
                // externaonlOnChange={(e) => {
                //     setQuantity(e.target.value);
                // }}
                // externalValue={quantity}
                onBlur={(e) => {
                    setQuantity(e.target.value);
                    if (e.target.value !== "") {
                        dispatch(
                            removeReduxError(`cantidadAvio-${trimNumber}`)
                        );
                    }
                }}
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
                        setTrimColor(e);
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

            {avios[trimNumber]?.colors && (
                <Box className="combos">
                    <Box className="combo">
                        <div className="upper-container">
                            Combo
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
                                            Number(color.Id) ===
                                            avios[trimNumber].colors[0].idColor
                                    )?.RGB
                                }`,
                            }}
                        ></Box>
                    </Box>
                </Box>
            )}
            {checkIfError(`comboAvio-${trimNumber}`, reduxErrors) && (
                <span className="combo-error">
                    Es necesario ingresar al menos 1 combo
                </span>
            )}
        </FabricContainer>
    );
};

export { Trims };
