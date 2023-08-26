import React from 'react'
import { Container } from '../ProviderStyles'
import { Box, Typography } from '@mui/material'
import { ControlledCheckbox, ControlledInput } from '@components/common'

const peopleCertifications = [
    {
        name: "Fair Labour Organization (FLA)",
        value: "fla"
    },
    {
        name: "WRAP",
        value: "wrap"
    },
    {
        name: "BSCI",
        value: "bsci"
    },
    {
        name: "SMETA",
        value: "smeta"
    },
    {
        name: "Fair Trade",
        value: "fairTrade"
    },
    {
        name: "Empresa B",
        value: "companyB"
    }
]


const PeopleCard = () => {
    return (
        <Container>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>
                Cantidad de trabajadores
                <Box sx={{mt: 1, gap: 0.5, display: 'flex', direction: 'row'}}>
                    <ControlledInput
                        name="womenWorkers"
                        label="Mujeres"
                        type="number"
                    />
                    <ControlledInput
                        name="menWorkers"
                        label="Hombres"
                        type="number"
                    />
                    <ControlledInput
                        name="totalWorkers"
                        label="Total"
                        type="number"
                        disabled={true}
                    />
                </Box>

            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h2">ES PARTE DE/ CUENTA CON ALGUNA DE LAS SIGUIENTE CERTIFICACIONES/PRORAMAS</Typography>
                {
                    peopleCertifications.map((certification, index) => (
                        <ControlledCheckbox
                            key={index}
                            label={certification.name}
                            name={certification.value}
                        />
                    ))
                }
            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>

                <Typography variant="h2">CÓDIGO DE CONDUCTA</Typography>
                    <ControlledCheckbox
                        label={"Cuento con una declaración jurada firmada por el proveedor el cual declara cumplir con los principios básicos de la OIT."}
                        name={"oit"}
                    />
                    <ControlledCheckbox
                        label={"El proveedor cuenta con un código de conducta para sus proveedores o sub contratos"}
                        name={"conductControll"}
                    />
            </Box>

        </Container>
    )
}


export {PeopleCard}