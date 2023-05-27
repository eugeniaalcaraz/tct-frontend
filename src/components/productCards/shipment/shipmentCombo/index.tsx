import {
    ControlledDatePicker,
    ControlledDropdown,
    ControlledInput,
} from "@components/common";
import { Box } from "@mui/material";
import React from "react";

export const ShipmentCombo = () => {
    return (
        <>
            <h2 style={{ width: "100%" }}>Combo</h2>

            <ControlledDropdown label="Destino" options={[]} name="embarque" />
            <ControlledInput label="Cantidad" name="cantidadComboEmbarque" />
            <ControlledDatePicker
                name="fechaEmbarque"
                label="Fecha de embarque"
            />
            <ControlledDropdown label="Embarque" options={[]} name="embarque" />
            <ControlledDatePicker
                name="ingresoDeposito"
                label="Ingreso Deposito"
            />

            <ControlledDatePicker name="ingresoTienda" label="Ingreso Tienda" />
        </>
    );
};
