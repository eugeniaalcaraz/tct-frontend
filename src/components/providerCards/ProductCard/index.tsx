import React, { useCallback, useContext, useMemo, useState } from "react";
import { ControlledCheckbox, ControlledDropdown } from "@components/common";
import { Container } from "../ProviderStyles";
import { Typography, Box, Button, IconButton } from "@mui/material";
import { Certifiaction, FormStructureContext } from "@/pages/newSupplier/FormContext";
import { json } from "stream/consumers";
import CertificationModal from "../CertificationModal";
import { Controller } from "react-hook-form";
import { useIconsContext } from "@components/hooks";
import { Delete } from "@mui/icons-material";


interface ICertificationMemo {
    productCertifications: Certifiaction[];
    productDocuments: Certifiaction[];
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




    const {productCertifications, productDocuments} = useMemo<ICertificationMemo>(() => {
        if (formContext) {
            return {
                productCertifications: formContext.productCertifications.filter(certification => certification.type === "Certificación"),
                productDocuments: formContext.productCertifications.filter(certification => certification.type === "Documento"),
            }
        }
        return {
            productCertifications: [],
            productDocuments: []
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
                    instalations.map((instalation, index) => (

                        <Box key={index} 
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 0
                            }} >
                        <ControlledCheckbox
                            key={index}
                            label={instalation}
                            name={"productInstalation."+instalation}
                        />
                            
                        </Box>
                    ))
                }
            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column', width: '100%', }}>

                <Typography variant="h2">TERCERIZADOS DIRECTAMENTE O SUBCONTRATADOS</Typography>
                {
                    tercerisations.map((tercerisation, index) => (

                        <Box key={index} 
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 0
                            }} >
                        <ControlledCheckbox
                            key={index}
                            label={tercerisation}
                            name={"productTercerisation."+tercerisation}
                        />
                            
                        </Box>
                    ))
                }
            </Box>

        </Container>
    );
};

export { ProductCard };
