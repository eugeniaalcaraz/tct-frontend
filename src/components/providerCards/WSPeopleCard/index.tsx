import React, { useContext, useEffect, useMemo } from 'react'
import { Container } from '../ProviderStyles'
import { Box, Typography } from '@mui/material'
import { ControlledCheckbox, ControlledInput } from '@components/common'
import { FormStructureContext, Certifiaction } from '@/pages/newSupplier/FormContext'
import { CertificationOption } from '../CertificationCard'
import { useFormContext } from 'react-hook-form'
import { i } from 'vitest/dist/index-5aad25c1'

interface IPeopleMemo {
    peopleCertifications: Certifiaction[];
    peopleDocuments: Certifiaction[];
}

const codigosConducta = [
    {
        id: 1,
        name: 'Cuento con una declaración jurada firmada por el proveedor el cual declara cumplir con los principios básicos de la OIT:',
        points: [
            "Trabajo infantil (OIT Convenio 138 y 182).",
            "Trabajo forzoso (OIT Convenios 29,105,182).",
            "Discriminación (OIT Convenios 100, 111.",
            "Libertad sindical y negociación colectiva (OIT Convenios 87, 98)."
        ]
    }
]

const healthCertifications = [
    {
        id: 1,
        name: "Cuento con plan de salud y seguridad ocupacional el cual es monitorieado por un técnico prevencionista de forma periódica."
    }
]



const WSPeopleCard = () => {
    const [useTotal, setUseTotal] = React.useState(false);
    const formContext = useContext(FormStructureContext)

    const { peopleCertifications, peopleDocuments } = useMemo<IPeopleMemo>(() => {
        if (formContext) {
            return {
                peopleCertifications: formContext.peopleCertifications.filter(certification => certification.type === "Certificación"),
                peopleDocuments: formContext.peopleCertifications.filter(certification => certification.type === "Documento"),
            }
        }
        return {
            peopleCertifications: [],
            peopleDocuments: []
        }
    }, [formContext])

    const useForm = useFormContext()

    useEffect(() => {
        useForm.watch((value, info) => {
            if (info.name === "employees.useTotal") {
                setUseTotal(value.employees.useTotal)
                useForm.setValue("employees.men", "0")
                useForm.setValue("employees.women", "0")
            }
        })
    }, [useForm])

    return (
        <Container>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>
                Cantidad de trabajadores
                <Box sx={{ mt: 1, gap: 0.5, display: 'flex', direction: 'row' }}>
                    <ControlledInput
                        name="employees.women"
                        label="Mujeres"
                        type="number"
                        disabled={useTotal}
                    />
                    <ControlledInput
                        name="employees.men"
                        label="Hombres"
                        type="number"
                        disabled={useTotal}

                    />
                    <ControlledInput
                        name="employees.total"
                        label="Total"
                        type="number"
                        disabled={!useTotal}
                    />
                </Box>
                <Box sx={{ mt: 1, gap: 0.5, display: 'flex', direction: 'row' }}>
                    <ControlledCheckbox
                        name="employees.useTotal"
                        label="Usar total"
                    />
                </Box>

            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography variant="h2">Veces al año que visitas este taller</Typography>
                <Box sx={{ mt: 0.5, gap: 0.2, display: 'flex', direction: 'row' }}>
                    <ControlledInput
                        name="yearlyVisits"
                        label=""
                        type="number"
                    />
                </Box>
            </Box>

            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>

                <Typography variant="h2" mb={0.5}>CÓDIGO DE CONDUCTA</Typography>
                {
                    codigosConducta.map((certification, index) => (
                        <Box key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'left',
                                gap: 0,
                                 width: '100%'
                            }} >
                            <ControlledCheckbox
                                key={index}
                                label={certification.name}
                                name={"conducta." + certification.id + ".check"}
                            />
                            <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column' }}>
                                <ul>
                                {
                                    certification.points.map((point, index) => (
                                        <li key={index}><Typography key={index} variant="body1">{point}</Typography></li>
                                    ))
                                }
                                </ul>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>

                <Typography variant="h2" mb={0.5}>SALUD & SEGURIDAD</Typography>
                {
                    healthCertifications.map((certification, index) => (
                        <Box key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'left',
                                gap: 0,
                                 width: '100%'
                            }} >
                            <ControlledCheckbox
                                key={index}
                                label={certification.name}
                                name={"conducta." + certification.id + ".check"}
                            />
                        </Box>
                    ))
                }
            </Box>

        </Container>
    )
}


export { WSPeopleCard }