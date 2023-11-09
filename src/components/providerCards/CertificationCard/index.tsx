import React, { useContext, useMemo } from "react";
import { ControlledCheckbox } from "@components/common";
import { Container } from "../ProviderStyles";
import { Typography, Box } from "@mui/material";
import { Certifiaction, FormStructureContext } from "@/pages/newSupplier/FormContext";
import { json } from "stream/consumers";
import CertificationModal from "../CertificationModal";
import { Controller } from "react-hook-form";
import { useIconsContext } from "@components/hooks";

const certifications = [
    {
        name: "Roadmap to Zero (ZDHC)",
        value: "zdhcRoadmap"
    },
    {
        name: "Bluesign",
        value: "bluesign"
    },
    {
        name: "Oeko-Tex",
        value: "oekeoTex"
    },
    {
        name: "ISO 14000",
        value: "iso14000"
    },
    {
        name: "EMAS",
        value: "emas"
    },
    {
        name: "Global Organic Textile Standard (GOTS)",
        value: "gots"
    },
    {
        name: "Global Recycle Standard (GRS)",
        value: "grs"
    },
    {
        name: "Organic Content Standard (OCS)",
        value: "ocs"
    },
    {
        name: "Recycled Content Standard (RCS)",
        value: "rcs"
    },
]


interface ICertificationMemo {
    planetCertifications: Certifiaction[];
    planetDocuments: Certifiaction[];
}

const CertificationCard = () => {
    const [openCertification, setOpenCertification] = React.useState(false);

    const formContext = useContext(FormStructureContext)

    const {planetCertifications, planetDocuments} = useMemo<ICertificationMemo>(() => {
        if (formContext) {
            return {
                planetCertifications: formContext.planetCertifications.filter(certification => certification.type === "Certificación"),
                planetDocuments: formContext.planetCertifications.filter(certification => certification.type === "Documento"),
            }
        }
        return {
            planetCertifications: [],
            planetDocuments: []
        }
    }, [formContext])

    const { icons } = useIconsContext();


    return (
        <Container>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h2">ES PARTE DE / CUENTA CON ALGUNA DE LAS SIGUIENTE CERTIFICACIONES/PRORAMAS</Typography>
                {
                    planetCertifications.map((certification, index) => (
                        <CertificationOption key={certification.id} certification={certification} index={index} />
                    ))
                }
            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>

                <Typography variant="h2">LISTA DE SUSTANCIAS RESTRINGIDAS</Typography>
                {
                    planetDocuments.map((certification, index) => (
                        <CertificationOption key={certification.id}  certification={certification} index={index} />
                    ))
                }
            </Box>

        </Container>
    );
};


export const CertificationOption = ({certification, index} : {certification: Certifiaction, index: number}) => {
    const { icons } = useIconsContext();

    return (
        <Box key={index} 
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 0
            }} >
        <ControlledCheckbox
            key={index}
            label={certification.description}
            name={certification.category+"."+certification.id+".check"}
        />
            <Controller
                name={certification.category+"."+certification.id+".date"}
                shouldUnregister
                render={({field}) => {
                    return (
                        field.value && <Typography sx={{mr: '1rem'}}>{new Date(field.value).toLocaleDateString()}</Typography>
                    )
                }}
            />

            <Controller
                name={certification.category+"."+certification.id+".scope"}
                shouldUnregister
                render={({field}) => {
                    return (
                        <div style={{color: 'green', fontWeight: 'bold'}}>
                            {field.value && "Scope"}
                        </div>
                    )
                }}
            />

        </Box>
    )
}

export { CertificationCard };
