import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Container } from '../ProviderStyles'
import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material'
import SearchSupplier from './SearchSupplierRefetch'
import { useQuery } from '@tanstack/react-query'
import { getSuppliersListAutocomplete } from '@/services/ProviderRequests'
import { useAppSelector } from '@/state/app/hooks'




const AsociateSupplierCard = () => {
    const { idMerchant } = useAppSelector((state) => state.user);

    const querySuppliers = useQuery(['supplier-autocomplete-list'], () => getSuppliersListAutocomplete(idMerchant))

    const supplierList = useMemo(() => {
        return querySuppliers.data ?? []
    }, [querySuppliers.data])

    return (
        <Container>
            {/* {JSON.stringify(querySuppliers.data)} */}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Autocomplete
                sx={{width: '200px'}}
                options={supplierList}
                getOptionLabel={(option) => option.alias+" - "+ (option.commercialName ?? "")}
                renderInput={(params) => <TextField size="small" {...params} label="Proveedores" />}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item>
                    <Button variant="contained" color="primary">Agregar</Button>
                </Grid>
            </Box>

        </Container>
    )
}


export {AsociateSupplierCard}