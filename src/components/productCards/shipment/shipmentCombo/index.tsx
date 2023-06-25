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
    const { countries, supplier, typeOfshipment, telas } = useAppSelector(
        (state) => state.product
    );
    const [selectedDestinationCountry, setselectedDestinationCountry] =
        useState("");
    const [selectedShipmentType, setSelectedShipmentType] = useState("");
    const [shippingDate, setShippingDate] = useState("");
    const [warehouseEntryDate, setWarehouseEntryDate] = useState("");
    const [entryDate, setEntryDate] = useState("");
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
                warehouseEntryDate,
                entryDate,
                shippingDate,
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
    ]);

    return (
        <>
            <h2 style={{ width: "100%" }}>{`Combo ${comboNumber}`}</h2>

            <ControlledDropdown
                label="Destino"
                useFormHook={false}
                externalOnChange={(e) => setselectedDestinationCountry(e.value)}
                selectedValue={selectedDestinationCountry}
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
                label="Cantidad"
                name={`cantidadComboEmbarque${comboNumber}`}
            />
            <ControlledDatePicker
                name={`fechaEmbarque${comboNumber}`}
                label="Fecha de embarque"
                useFormHook={false}
                externalOnChange={(e: Dayjs) =>
                    setShippingDate(e.format("YYYY-DD-MM"))
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
                    setWarehouseEntryDate(e.format("YYYY-DD-MM"))
                }
            />

            <ControlledDatePicker
                name={`ingresoTiendaCombo${comboNumber}`}
                label="Ingreso Tienda"
                useFormHook={false}
                externalOnChange={(e: Dayjs) =>
                    setEntryDate(e.format("YYYY-DD-MM"))
                }
            />
        </>
    );
};
