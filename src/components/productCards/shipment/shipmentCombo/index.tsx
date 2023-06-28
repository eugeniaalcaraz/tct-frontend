import React, { FC, useEffect, useMemo, useState } from "react";
import { addTela, addTelasArray } from "@/state/features/product";
import { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { OptionsType } from "@/types";
import {
    ControlledDatePicker,
    ControlledDropdown,
    ControlledInput,
} from "@components/common";

type ShipmentComboProps = {
    comboNumber: number;
    isForAllCombos: boolean;
};

export const ShipmentCombo: FC<ShipmentComboProps> = ({
    comboNumber,
    isForAllCombos,
}) => {
    const { countries, supplier, typeOfshipment, telas, errors } =
        useAppSelector((state) => state.product);
    const [selectedDestinationCountry, setselectedDestinationCountry] =
        useState("");
    const [selectedShipmentType, setSelectedShipmentType] = useState("");
    const [shippingDate, setShippingDate] = useState("");
    const [warehouseEntryDate, setWarehouseEntryDate] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const telasUpdatableObject = useMemo(
        () => ({ ...telas[comboNumber - 1] }),
        [telas]
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
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
                    quantity !== ""
                        ? Number(quantity)
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
        quantity,
    ]);

    const mesgReturner = (valueToEvaluate: string) => {
        if (errors) {
            if (valueToEvaluate.length) {
                return "Requerido";
            }
            if (!/^[0-9.,\b]+$/.test(valueToEvaluate)) {
                return "Solo numbero aqui!";
            }
        }
    };

    const checkError = (valueToEvaluate) => {
        if (errors) {
            return valueToEvaluate === "";
        } else {
            return false;
        }
    };

    return (
        <>
            {/* <h2 style={{ width: "100%" }}>{`Combo ${comboNumber}`}</h2> */}
            <h2 style={{ width: "100%" }}>{`Combo`}</h2>

            <ControlledDropdown
                label="Destino"
                useFormHook={false}
                externalOnChange={(e) => setselectedDestinationCountry(e.value)}
                selectedValue={selectedDestinationCountry}
                error={checkError(selectedDestinationCountry)}
                helperText={mesgReturner(selectedDestinationCountry)}
                options={
                    countries?.map(
                        ({ Id, Name }): OptionsType => ({
                            Id: String(Id),
                            Description: Name,
                        })
                    ) ?? []
                }
                name={`embarque-${comboNumber}`}
            />
            <ControlledInput
                useFormhook={false}
                label="Cantidad"
                name={`cantidadComboEmbarque${comboNumber}`}
                externalOnChange={(e) => setQuantity(e.target.value)}
                externalValue={quantity}
                error={quantity === ""}
                helperText={() => mesgReturner(quantity)}
            />
            <ControlledDatePicker
                name={`fechaEmbarque${comboNumber}`}
                label="Fecha de embarque"
                useFormHook={false}
                externalOnChange={(e: Dayjs) =>
                    setShippingDate(e.format("YYYY-MM-DD"))
                }
            />
            <ControlledDropdown
                label="Embarque"
                options={typeOfshipment ?? []}
                name={`embarqueComboTipo${comboNumber}`}
                externalOnChange={(e) => setSelectedShipmentType(e.value)}
                selectedValue={selectedShipmentType}
                useFormHook={false}
            />
            <ControlledDatePicker
                name={`ingresoDeposito${comboNumber}`}
                label="Ingreso Deposito"
                useFormHook={false}
                externalOnChange={(e: Dayjs) =>
                    setWarehouseEntryDate(e.format("YYYY-MM-DD"))
                }
            />

            <ControlledDatePicker
                name={`ingresoTiendaCombo${comboNumber}`}
                label="Ingreso Tienda"
                useFormHook={false}
                externalOnChange={(e: Dayjs) =>
                    setEntryDate(e.format("YYYY-MM-DD"))
                }
            />
        </>
    );
};
