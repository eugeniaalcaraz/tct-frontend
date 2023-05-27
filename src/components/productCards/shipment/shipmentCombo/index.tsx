import { useAppSelector } from "@/state/app/hooks";
import { OptionsType } from "@/types";
import {
    ControlledDatePicker,
    ControlledDropdown,
    ControlledInput,
} from "@components/common";

import React, { FC } from "react";

type ShipmentComboProps = {
    comboNumber: number;
};

export const ShipmentCombo: FC<ShipmentComboProps> = ({ comboNumber }) => {
    const { countries, supplier, typeOfshipment } = useAppSelector(
        (state) => state.product
    );
    return (
        <>
            <h2 style={{ width: "100%" }}>{`Combo ${comboNumber}`}</h2>

            <ControlledDropdown
                label="Destino"
                options={
                    countries?.map(
                        ({ Id, Name }): OptionsType => ({
                            Id: String(Id),
                            Description: Name,
                        })
                    ) ?? []
                }
                name="embarque"
            />
            <ControlledInput
                label="Cantidad"
                name={`cantidadComboEmbarque${comboNumber}`}
            />
            <ControlledDatePicker
                name={`fechaEmbarque${comboNumber}`}
                label="Fecha de embarque"
            />
            <ControlledDropdown
                label="Embarque"
                options={typeOfshipment ?? []}
                name={`embarqueComboTipo${comboNumber}`}
            />
            <ControlledDatePicker
                name={`ingresoDeposito${comboNumber}`}
                label="Ingreso Deposito"
            />

            <ControlledDatePicker
                name={`ingresoTiendaCombo${comboNumber}`}
                label="Ingreso Tienda"
            />
        </>
    );
};
