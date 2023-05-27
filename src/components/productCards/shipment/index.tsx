import React, { useState } from "react";
import {
    ControlledDatePicker,
    ControlledDropdown,
    ControlledInput,
} from "@components/common";
import { Button, Box, Tooltip } from "@mui/material";
import { Container } from "./ShipmentStyles";
import { useAppSelector } from "@/state/app/hooks";
import { OptionsType } from "@/types";
import { ControlledCheckbox } from "@components/common/form/controlledCheckbox";
import { ShipmentCombo } from "./shipmentCombo";

const Shipment = () => {
    const { countries, supplier, typeOfshipment, errors, combos } =
        useAppSelector((state) => state.product);

    const [allCombosShareShipment, setAllCombosShareShipment] = useState(true);

    const checkIfError = (name) => {
        if (errors) {
            return Object.keys(errors).includes(name);
        }
        return false;
    };

    const checkErrorMessage = (name) => {
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
        <Container className={checkIfError("cantidadEmbarque") ? "error" : ""}>
            <ControlledDropdown
                label="Origen"
                options={
                    countries?.map(
                        ({ Id, Name }): OptionsType => ({
                            Id: String(Id),
                            Description: Name,
                        })
                    ) ?? []
                }
                name="origen"
            />
            <ControlledDropdown
                label="Proveedor"
                options={
                    supplier?.map(
                        ({ Id, Name, Lastname }): OptionsType => ({
                            Id: String(Id),
                            Description: `${Name} ${Lastname}`,
                        })
                    ) ?? []
                }
                name="proveedor"
            />
            <ControlledInput
                label="Cantidad Total"
                name="cantidadEmbarqueTotal"
                error={checkIfError("cantidadEmbarque")}
                helperText={checkErrorMessage("cantidadEmbarque")}
            />
            <ControlledInput
                label="Codigo de fabirca"
                name="codigoFabricaEmbarque"
                error={checkIfError("cantidadEmbarque")}
                helperText={checkErrorMessage("cantidadEmbarque")}
            />
            <div className="checkboxContainer">
                <ControlledCheckbox
                    name="mismoComboParaTodoEmbarque"
                    label="Todos los combos tienen el mismo embarque ?"
                    defaultCheckedProp={true}
                    externalOnChange={() =>
                        setAllCombosShareShipment(!allCombosShareShipment)
                    }
                />
            </div>
            {!allCombosShareShipment &&
                combos.map((value, index) => (
                    <ShipmentCombo key={index} comboNumber={index + 1} />
                ))}
            {allCombosShareShipment && <ShipmentCombo comboNumber={1} />}
        </Container>
    );
};

export { Shipment };
