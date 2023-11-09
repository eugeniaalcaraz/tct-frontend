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


const PeopleCard = () => {
    const [useTotal, setUseTotal] = React.useState(false);
    const formContext = useContext(FormStructureContext)

    const {peopleCertifications, peopleDocuments} = useMemo<IPeopleMemo>(() => {
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
        useForm.watch( (value, info) => {
            if(info.name === "employees.useTotal"){
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
                <Box sx={{mt: 1, gap: 0.5, display: 'flex', direction: 'row'}}>
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
                <Box sx={{mt: 1, gap: 0.5, display: 'flex', direction: 'row'}}>
                    <ControlledCheckbox
                        name="employees.useTotal"
                        label="Usar total"
                    />
                </Box>

            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h2">ES PARTE DE/ CUENTA CON ALGUNA DE LAS SIGUIENTE CERTIFICACIONES/PRORAMAS</Typography>
                {
                    peopleCertifications.map((certification, index) => (
                        <CertificationOption key={certification.id} certification={certification} index={index}/>
                    ))
                }
            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>

                <Typography variant="h2">CÓDIGO DE CONDUCTA</Typography>
                {
                    peopleDocuments.map((certification, index) => (
                        <CertificationOption key={certification.id} certification={certification} index={index}/>
                    ))
                }
            </Box>

        </Container>
    )
}


export {PeopleCard}