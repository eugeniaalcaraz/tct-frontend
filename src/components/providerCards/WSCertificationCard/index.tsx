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
    "Gestión de residuos de corte: separar y clasificar los residuos por fibra y color.",
    "Gestión de residuos de corte: colaborar con terceros que se beneficien de estos. ",
    "Eficiencia energética: iluminación LED",
    "Eficiencia energética: instalación de fuentes propias de energía renovable.",
    "Eficiencia energética: sistemas de climatización eficientes."
]


interface ICertificationMemo {
    planetCertifications: Certifiaction[];
    planetDocuments: Certifiaction[];
}

const WSCertificationCard = () => {
    const [openCertification, setOpenCertification] = React.useState(false);

    const formContext = useContext(FormStructureContext)

    const { planetCertifications, planetDocuments } = useMemo<ICertificationMemo>(() => {
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
                <Typography variant="h2">REALIZA ALGUNA DE LAS SIGUIENTES PRÁCTICAS</Typography>
                {
                    certifications.map((certification, index) => (
                        <Box key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 0
                            }} >
                            <ControlledCheckbox
                                key={index}
                                label={certification}
                                name={"peopleCertWS." + certification + ".check"}
                            />
                        </Box>
                    ))
                }
            </Box>

        </Container>
    );
};


export const CertificationOption = ({ certification, index }: { certification: Certifiaction, index: number }) => {
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
                name={certification.category + "." + certification.id + ".check"}
            />
            <Controller
                name={certification.category + "." + certification.id + ".date"}
                shouldUnregister
                render={({ field }) => {
                    return (
                        field.value && <Typography sx={{ mr: '1rem' }}>{new Date(field.value).toLocaleDateString()}</Typography>
                    )
                }}
            />

            <Controller
                name={certification.category + "." + certification.id + ".scope"}
                shouldUnregister
                render={({ field }) => {
                    return (
                        <div style={{ color: 'green', fontWeight: 'bold' }}>
                            {field.value && "Scope"}
                        </div>
                    )
                }}
            />

        </Box>
    )
}

export { WSCertificationCard };
