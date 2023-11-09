import React, { useCallback, useContext, useMemo, useState } from "react";
import { ControlledCheckbox, ControlledDropdown } from "@components/common";
import { Container } from "../ProviderStyles";
import { Typography, Box, Button, IconButton } from "@mui/material";
import { Certifiaction, FormStructureContext, ProcessCertification } from "@/pages/newSupplier/FormContext";
import { json } from "stream/consumers";
import CertificationModal from "../CertificationModal";
import { Controller } from "react-hook-form";
import { useIconsContext } from "@components/hooks";
import { Delete } from "@mui/icons-material";


interface ICertificationMemo {
    processInstalation: ProcessCertification[];
    processTerceristaion: ProcessCertification[];
}

const instalations = [
    "Pre-tratamientos y teñido.",
    "Corte, confección y armado.",
    "Tejido y armado.",
    "Estampado.",
    "Bordado",
    "Lavado y acabado."
]

const tercerisations = [
    "Hilado.",
    "Tejido de la tela.",
    "Curtido de pieles.",
    "Pre-tratamientos y teñidos.",
    "Bordado.",
    "Estampado.",
    "Lavado y acabado.",
    "Desarrollo telas no tejidas.",
    "Desarrollo de avíos."
]

const ProductCard = () => {
    const [openCertification, setOpenCertification] = React.useState(false);
    const [productQuantity, setProductQuantity] = useState(1)

    const formContext = useContext(FormStructureContext)
    const icons = useIconsContext()




    const {processInstalation, processTerceristaion} = useMemo<ICertificationMemo>(() => {
        if (formContext) {
            return {
                processInstalation: formContext.processCertifications.filter(certification => certification.type === "Dentro de las instalaciones"),
                processTerceristaion: formContext.processCertifications.filter(certification => certification.type === "Tercerizados Directamente o Subcontratados"),
            }
        }
        return {
            processInstalation: [],
            processTerceristaion: []
        }
    }, [formContext])

    const removeProduct = useCallback((index) => {
        
    }, [])


    return (
        <Container> 
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column', width: '100%' }}>
                {
                    new Array(productQuantity).fill(null).map((item, index) => (
                        <Box key={index} sx={{width: '100%', mb:0.5, display: 'flex', alignItems: 'center'}}>
                        <ControlledDropdown
                            key={`productTypes[${index}]`}
                            name={`productTypes[${index}]`}
                            label="Tipo de producto *"
                            sx={{ width: "250px", mr: 1 }}
                            options={formContext?.supplierProductTypes.map((item) => ({ Description: item.description, Id: item.id+"" })) ?? []}
                            shouldUnregister
                        />
                        {index != 0 && index == productQuantity-1 && <IconButton onClick={() => setProductQuantity((prev) => prev-1)} ><Delete /></IconButton>}
                    </Box>
                    ))
                }
                <Box sx={{width: '100%', mb:0.5, display: 'flex', alignItems: 'center'}}>
                    <Button sx={{width: "250px"}} startIcon={icons['plus']} onClick={() => setProductQuantity((prev) => prev+1)}>
                        Agregar
                    </Button>
                </Box>
                
            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column', width: '100%', }}>

                <Typography variant="h2">DENTRO DE LAS INSTALACIONES</Typography>
                {
                    processInstalation.map((instalation, index) => (

                        <Box key={index} 
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 0
                            }} >
                        <ControlledCheckbox
                            key={index}
                            label={instalation.description}
                            name={"process."+instalation.id}
                        />
                            
                        </Box>
                    ))
                }
            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column', width: '100%', }}>

                <Typography variant="h2">TERCERIZADOS DIRECTAMENTE O SUBCONTRATADOS</Typography>
                {
                    processTerceristaion.map((tercerisation, index) => (

                        <Box key={index} 
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 0
                            }} >
                        <ControlledCheckbox
                            key={index}
                            label={tercerisation.description}
                            name={"process."+tercerisation.id}
                        />
                            
                        </Box>
                    ))
                }
            </Box>

        </Container>
    );
};

export { ProductCard };
