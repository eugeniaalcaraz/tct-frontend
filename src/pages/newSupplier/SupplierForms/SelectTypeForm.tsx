

import { ButtonBase, Grid, Paper, Typography } from "@mui/material";
import { Container, Content } from "../../newProduct/NewProductStyles";
import React from "react";
import { AddBusiness, Construction, CurrencyExchange, Factory, Storefront } from "@mui/icons-material";
import {motion} from 'framer-motion'


interface ISelectTypeForm {
    supplierTypes: { id: number, description: string }[],
    onSelected: (id:number) => void
}

const SupplierIcon = ({ id, sx }: { id: number, sx?: any }) => {

    const defaultSx = {
        fontSize: 45,
        color: "primary.main"
    }

    switch (id) {
        case 1:
            return <Factory sx={{...defaultSx, ...sx}} />
        case 2:
            return <CurrencyExchange sx={{...defaultSx, ...sx}}/>
        case 3:
            return <Storefront sx={{...defaultSx, ...sx}} />
        case 4:
            return <Construction sx={{...defaultSx, ...sx}}/>
        default:
            return <AddBusiness sx={{...defaultSx, ...sx}}/>
    }
}



const SelectTypeForm = ({ supplierTypes, onSelected }: ISelectTypeForm) => {
    // Define variants for the container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    // Variants for each item
    const itemVariants = {
        hidden: { scale: 0.5, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },

    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: 'easeInOut',
            },
        },
        tap: {
            scale: 0.95, 
            transition: {
                duration: 0.1,
                ease: 'easeInOut',
            },
        },
    };


    return (
        <Content>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Grid container justifyContent="center" my={2}>
                    <h1>Seleccióna un tipo de proveedor</h1>
                </Grid>
                <Grid
                    container
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {supplierTypes.map((supplierType) => (
                        <Grid item xs={12} p={1} key={supplierType.id} sx={{width: {xs: '80vw', md: '50vw'}}}>
                             <motion.div
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            style={{ width: '100%' }}
                        >
                            <ButtonBase sx={{width: '100%'}} onClick={() => onSelected(supplierType.id)}>
                                <motion.div variants={itemVariants} style={{width: '100%'}}>
                                    <Paper
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2
                                        }}
                                    >
                                        <Grid item>
                                            <SupplierIcon id={supplierType.id} />
                                        </Grid>
                                        <Typography variant="h4">
                                            {supplierType.description}
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            </ButtonBase>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Content>
    );
}

export default SelectTypeForm;


