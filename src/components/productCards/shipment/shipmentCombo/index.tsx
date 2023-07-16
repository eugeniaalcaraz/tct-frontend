import React, { FC, useEffect, useMemo, useState } from "react";
import {
    addTela,
    addTelasArray,
    removeReduxError,
    setReduxErrors,
} from "@/state/features/product";
import { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { OptionsType } from "@/types";
import {
    ControlledDatePicker,
    ControlledDropdown,
    ControlledInput,
} from "@components/common";
import { useFormContext } from "react-hook-form";
import {
    checkErrorMessage,
    checkIfError,
} from "@/pages/newProduct/aux/errorValidation";

type ShipmentComboProps = {
    comboNumber: number;
    isForAllCombos: boolean;
};

export const ShipmentCombo: FC<ShipmentComboProps> = ({
    comboNumber,
    isForAllCombos,
}) => {
    const {
        countries,
        typeOfshipment,
        telas,
        errors,
        reduxErrors,
        mutationSuccess,
    } = useAppSelector((state) => state.product);
    const [selectedDestinationCountry, setselectedDestinationCountry] =
        useState("");
    const [selectedShipmentType, setSelectedShipmentType] = useState("");
    const [shippingDate, setShippingDate] = useState("");
    const [warehouseEntryDate, setWarehouseEntryDate] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [reduxQuantity, setreduxQuantity] = useState("");
    const telasUpdatableObject = useMemo(
        () => ({ ...telas[comboNumber - 1] }),
        [telas]
    );
    const dispatch = useAppDispatch();
    const {
        formState: { isSubmitting },
    } = useFormContext();

    useEffect(() => {
        console.log("estoy submiitendo en shipment combo");

        if (isForAllCombos) {
            const updatedTelas = telas.map((tela) => ({
                ...tela,
                idCountryDestination:
                    selectedDestinationCountry !== ""
                        ? Number(selectedDestinationCountry)
                        : 0,
                idShipping:
                    selectedShipmentType !== ""
                        ? Number(selectedShipmentType)
                        : 0,
                warehouseEntryDate:
                    warehouseEntryDate !== ""
                        ? warehouseEntryDate
                        : telasUpdatableObject.warehouseEntryDate,
                entryDate:
                    entryDate !== ""
                        ? entryDate
                        : telasUpdatableObject.entryDate,
                shippingDate:
                    shippingDate !== ""
                        ? shippingDate
                        : telasUpdatableObject.shippingDate,
                quantity:
                    reduxQuantity !== ""
                        ? Number(reduxQuantity)
                        : telasUpdatableObject.quantity,
            }));

            dispatch(addTelasArray(updatedTelas));
        } else {
            dispatch(
                addTela({
                    fabricNumber: comboNumber - 1,
                    tela: {
                        ...telasUpdatableObject,
                        idCountryDestination:
                            selectedDestinationCountry !== ""
                                ? Number(selectedDestinationCountry)
                                : 0,
                        idShipping:
                            selectedShipmentType !== ""
                                ? Number(selectedShipmentType)
                                : 0,
                        quantity:
                            reduxQuantity !== ""
                                ? Number(reduxQuantity)
                                : telasUpdatableObject.quantity,
                        warehouseEntryDate,
                        entryDate,
                        shippingDate,
                    },
                })
            );
        }
    }, [
        selectedDestinationCountry,
        selectedShipmentType,
        warehouseEntryDate,
        entryDate,
        shippingDate,
        reduxQuantity,
    ]);

    useEffect(() => {
        if (isSubmitting) {
            if (selectedDestinationCountry === "") {
                dispatch(
                    setReduxErrors({
                        idError: `destino-${comboNumber}`,
                        msg: "Requerido",
                    })
                );
            }
            if (quantity === "") {
                dispatch(
                    setReduxErrors({
                        idError: `cantidadComboEmbarque-${comboNumber}`,
                        msg: "Requerido",
                    })
                );
            }
            if (!/^[0-9.,\b]+$/.test(quantity)) {
                console.log({ quantity, test: /^[0-9.,\b]+$/.test(quantity) });

                dispatch(
                    setReduxErrors({
                        idError: `cantidadComboEmbarque-${comboNumber}`,
                        msg: "Solo numeros",
                    })
                );
            }
            if (selectedShipmentType === "") {
                dispatch(
                    setReduxErrors({
                        idError: `embarqueComboTipo-${comboNumber}`,
                        msg: "Requerido",
                    })
                );
            }
        }
    }, [isSubmitting]);

    useEffect(() => {
        if (mutationSuccess) {
            console.log("IS SUBMITTED", mutationSuccess);
            setQuantity("");
            setSelectedShipmentType("");
            setselectedDestinationCountry("");
        }
    }, [mutationSuccess]);

    return (
        <>
            {/* <h2 style={{ width: "100%" }}>{`Combo ${comboNumber}`}</h2> */}
            <h2 style={{ width: "100%" }}>{`Combo`}</h2>

            <ControlledDropdown
                label="Destino"
                disabled={!telas.length}
                id={`destino-${comboNumber}`}
                useFormHook={false}
                externalOnChange={(e) => {
                    setselectedDestinationCountry(e.value);
                    if (e.value !== "") {
                        dispatch(removeReduxError(`destino-${comboNumber}`));
                    }
                }}
                selectedValue={selectedDestinationCountry}
                error={checkIfError(`destino-${comboNumber}`, reduxErrors)}
                helperText={checkErrorMessage(
                    `destino-${comboNumber}`,
                    reduxErrors
                )}
                options={
                    countries?.map(
                        ({ Id, Name }): OptionsType => ({
                            Id: String(Id),
                            Description: Name,
                        })
                    ) ?? []
                }
                name={`destino-${comboNumber}`}
            />
            <ControlledInput
                useFormhook={false}
                disabled={!telas.length}
                label="Cantidad"
                name={`cantidadComboEmbarque-${comboNumber}`}
                externalOnChange={(e) => {
                    setQuantity(e.target.value);
                }}
                onBlur={(e) => {
                    if (e.target.value !== "") {
                        console.log(e.target.value);

                        setreduxQuantity(e.target.value);
                        dispatch(
                            removeReduxError(
                                `cantidadComboEmbarque-${comboNumber}`
                            )
                        );
                    }
                }}
                externalValue={quantity}
                id={"cantidadComboEmbarque"}
                error={checkIfError(
                    `cantidadComboEmbarque-${comboNumber}`,
                    reduxErrors
                )}
                helperText={checkErrorMessage(
                    `cantidadComboEmbarque-${comboNumber}`,
                    reduxErrors
                )}
            />
            <ControlledDatePicker
                name={`fechaEmbarque${comboNumber}`}
                label="Fecha de embarque"
                useFormHook={false}
                disabled={!telas.length}
                externalOnChange={(e: Dayjs) =>
                    setShippingDate(e.format("YYYY-MM-DD"))
                }
            />
            <ControlledDropdown
                label="Embarque"
                id={"embarque"}
                disabled={!telas.length}
                options={typeOfshipment ?? []}
                name={`embarqueComboTipo-${comboNumber}`}
                externalOnChange={(e) => {
                    setSelectedShipmentType(e.value);

                    if (e.value !== "") {
                        dispatch(
                            removeReduxError(`embarqueComboTipo-${comboNumber}`)
                        );
                    }
                }}
                error={checkIfError(
                    `embarqueComboTipo-${comboNumber}`,
                    reduxErrors
                )}
                helperText={checkErrorMessage(
                    `embarqueComboTipo-${comboNumber}`,
                    reduxErrors
                )}
                selectedValue={selectedShipmentType}
                useFormHook={false}
            />
            <ControlledDatePicker
                name={`ingresoDeposito${comboNumber}`}
                label="Ingreso Deposito"
                disabled={!telas.length}
                useFormHook={false}
                externalOnChange={(e: Dayjs) =>
                    setWarehouseEntryDate(e.format("YYYY-MM-DD"))
                }
            />

            <ControlledDatePicker
                name={`ingresoTiendaCombo${comboNumber}`}
                label="Ingreso Tienda"
                disabled={!telas.length}
                useFormHook={false}
                externalOnChange={(e: Dayjs) =>
                    setEntryDate(e.format("YYYY-MM-DD"))
                }
            />
        </>
    );
};
