import React from 'react'
import { Box, Grid } from "@mui/material";
import {
    CardBase,
} from "@components/common";
import { PeopleCard } from "@components/providerCards/PeopleCard";
import { GeneralCard } from "@components/providerCards/GeneralCard";
import { ProductCard } from "@components/providerCards/ProductCard";
import { CertificationCard } from "@components/providerCards/CertificationCard";
import { WSPeopleCard } from '@components/providerCards/WSPeopleCard';
import { WSCertificationCard } from '@components/providerCards/WSCertificationCard';
import { AsociateSupplierCard } from '@components/providerCards/AsociateSupplierCard.tsx';

const MultiSupplierForm = () => {


    return (
        <>
            <Grid item sx={{width: '100%'}}>
                <CardBase
                    header="INFORMACIÓN GENERAL"
                    content={<GeneralCard />}
                />
            </Grid>
            <Grid item>
                <CardBase
                    header="Subproveedores"
                    content={<AsociateSupplierCard />}
                />
            </Grid>
        </>
    )

}



export default MultiSupplierForm;