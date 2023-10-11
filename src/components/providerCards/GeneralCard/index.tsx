import React, { useContext, useMemo } from "react";
import { ControlledCheckbox, ControlledDatePicker, ControlledDropdown, ControlledInput } from "@components/common";
import { Container } from "./GeneralStyles";
import { Typography, Box } from "@mui/material";
import { FormStructureContext } from "@/pages/newSupplier/FormContext";


const GeneralCard = () => {
    const formContext = useContext(FormStructureContext)

    const {supplierTypes, countries} = useMemo(() => {
        if (formContext) {
            return formContext
        }
        return {
            supplierTypes: [],
            countries: []
        }
    }, [formContext])

    return (
        <Container >
                <ControlledDropdown
                    name="supplierTypeId"
                    label="Tipo de proveedor *"
                    disabled                    
                    options={supplierTypes.map(supplierType => ({ Id: supplierType.id+"", Description: supplierType.description }))}
                />
                <Box sx={{width: "calc(50% - 0.5rem)"}}/>
                <ControlledInput
                    name="alias"
                    label="Alias *"
                />
                <ControlledInput
                    name="commercialName"
                    label="Nombre Comercial"
                />
                <ControlledInput
                    name="vatNumber"
                    type="number"
                    label="Número Vat *"
                />
                <ControlledDropdown
                    name="country"
                    label="País *"
                    options={countries.map(country => ({ Id: country.Id+"", Description: country.Name }))}
                />
                <Box sx={{
                    width: '100%', 
                    "&& > .MuiTextField-root": {
                        width: '100%'
                    },
                    }}>
                    <ControlledInput
                        name="address"
                        label="Dirección *"
                    />
                </Box>
                <ControlledInput
                    name="contactPerson"
                    label="Persona de contacto"
                />
                <ControlledInput
                    name="email"
                    label="Email de contacto"
                />
                <ControlledDatePicker
                    size="small"
                    name="commercialRelationDate"
                    label="Inicio relación comercial *"
                    disableDefaultDate
                    disablePast={false}
                    />

                <ControlledInput
                    name="estimatedAnualOrder"
                    label="Pedido anual estimado"
                    type="number"
                    />
                <ControlledCheckbox
                    name="anualContract"
                    label="Tengo un contrato de producción anual con el proveedor"
                    />

        </Container>
    );
};

export { GeneralCard };
