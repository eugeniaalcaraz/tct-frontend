import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ControlledDropdown, ControlledInput } from "@components/common";
import { Container } from "./ShipmentStyles";
import { useAppSelector } from "@/state/app/hooks";
import { OptionsType } from "@/types";
import { ShipmentCombo } from "./shipmentCombo";

const Shipment = () => {
    const { countries, supplier, errors, telas } = useAppSelector(
        (state) => state.product
    );

    const [allCombosShareShipment] = useState(true);

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
                name="idCountry"
                error={checkIfError("idCountry")}
                helperText={checkErrorMessage("idCountry")}
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
                name="idSupplier"
                error={checkIfError("idSupplier")}
                helperText={checkErrorMessage("idSupplier")}
            />
            <ControlledInput
                label="Cantidad Total"
                name="quantity"
                error={checkIfError("quantity")}
                helperText={checkErrorMessage("quantity")}
            />
            <ControlledInput
                label="Codigo de fabrica"
                name="fabricCode"
                error={checkIfError("fabricCode")}
                helperText={checkErrorMessage("fabricCode")}
            />
            <div className="checkboxContainer">
                {/* TODO: queda para implementar despues<ControlledCheckbox
                    name="mismoComboParaTodoEmbarque"
                    label="Todos los combos tienen el mismo embarque ?"
                    defaultCheckedProp={true}
                    externalOnChange={() =>
                        setAllCombosShareShipment(!allCombosShareShipment)
                    }
                /> */}
            </div>
            {(allCombosShareShipment ? Array.from(Array(1).keys()) : telas).map(
                (value, index) => (
                    <ShipmentCombo
                        key={uuid()}
                        comboNumber={index + 1}
                        isForAllCombos={allCombosShareShipment}
                    />
                )
            )}
        </Container>
    );
};

export { Shipment };
