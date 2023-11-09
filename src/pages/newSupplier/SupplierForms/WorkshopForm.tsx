import React from 'react'
import { Box } from "@mui/material";
import {
    CardBase,
} from "@components/common";
import { PeopleCard } from "@components/providerCards/PeopleCard";
import { GeneralCard } from "@components/providerCards/GeneralCard";
import { ProductCard } from "@components/providerCards/ProductCard";
import { CertificationCard } from "@components/providerCards/CertificationCard";
import { WSPeopleCard } from '@components/providerCards/WSPeopleCard';
import { WSCertificationCard } from '@components/providerCards/WSCertificationCard';

const WorkshopForm = () => {


    return (
        <>
            <Box>
                <CardBase
                    header="INFORMACIÓN GENERAL"
                    content={<GeneralCard />}
                />
                <CardBase
                    header="Personas"
                    content={<WSPeopleCard />}
                />
            </Box>
            <Box>
                <CardBase
                    header="Producto & Alcance"
                    content={<ProductCard />}
                />
                <CardBase
                    header="Planeta"
                    content={<WSCertificationCard />}
                />
            </Box>
        </>
    )

}



export default WorkshopForm;