import React from "react";
import { ControlledCheckbox, ControlledDropdown, ControlledInput } from "@components/common";
import { Container } from "./GeneralStyles";
import { Typography, Box } from "@mui/material";

const countrys = [
    'Argentina',
    'Uruguay'
]

const GeneralCard = () => {


    return (
        <Container >
                <ControlledDropdown
                    name="typeprovider"
                    label="Tipo de proveedor *"
                    options={[
                        {
                            Id: "factory",
                            Description: "Fábrica"
                        },
                        {
                            Id: "workshop",
                            Description: "Taller"
                        },
                        {
                            Id: "traiding",
                            Description: "Traiding"
                        },
                        {
                            Id: "market",
                            Description: "Mercado"
                        },

                    ]}
                    
                />
                <Box sx={{width: "calc(50% - 0.5rem)"}}/>
                <ControlledInput
                    name="alias"
                    label="Alias *"
                />
                <ControlledInput
                    name="comercialName"
                    label="Nombre Comercial"
                />
                <ControlledInput
                    name="nroVap"
                    label="Número Vat *"
                />
                <ControlledDropdown
                    name="country"
                    label="País *"
                    options={countrys.map(country => ({ Id: country, Description: country }))}
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
                    name="contactPeople"
                    label="Persona de contacto"
                />
                <ControlledInput
                    name="contactEmail"
                    label="Email de contacto"
                />
                <ControlledInput
                    name="relationStart"
                    label="Inicio relación comercial"
                    />

                <ControlledInput
                    name="anualOrderEstimate"
                    label="Pedido anual estimado"
                    type="number"
                    />
                <ControlledCheckbox
                    name="anualProductionContract"
                    label="Tengo un contrato de producción anual con el proveedor"
                    />

        </Container>
    );
};

export { GeneralCard };
