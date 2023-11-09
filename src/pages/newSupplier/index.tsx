import { CertificationCard } from "@components/providerCards/CertificationCard";
import React, { useEffect, useMemo, useState } from "react";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import listCertProduct from "./listCertProduct";
import { useAppSelector } from "@/state/app/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    CardBase,
    Footer,
    Form,
    ScreenLoader,
    Snackbars,
} from "@components/common";
import { Container, Content } from "../newProduct/NewProductStyles";
import { Alert, Box, Button, CircularProgress, Grid } from "@mui/material";
import { PeopleCard } from "@components/providerCards/PeopleCard";
import { GeneralCard } from "@components/providerCards/GeneralCard";
import { useForm } from "react-hook-form";
import { getSupplierFormData, saveSupplier } from "@/services/ProviderRequests";
import { FormStructureContext } from "./FormContext";
import { IProvider } from "./IProvider";
import CertificationModal from "@components/providerCards/CertificationModal";
import { ProductCard } from "@components/providerCards/ProductCard";
import { supplierFormToQuery } from "./saveHandler";
import { getErrorMessage } from "@/utils";
import zFactory from "./zodModels/zFactory";
import SelectTypeForm from "./SupplierForms/SelectTypeForm";
import { ArrowBack, ArrowLeft, Factory } from "@mui/icons-material";
import WorkshopForm from "./SupplierForms/WorkshopForm";
import FactoryForm from "./SupplierForms/FactoryForm";
import MultiSupplierForm from "./SupplierForms/MultiSupplierForm";



const NewProvider = () => {
    const [openCertification, setOpenCertification] = React.useState<false | string>(false);
    const [loadingSave, setLoadingSave] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<false | string>(false);
    const [successMessage, setSuccessMessage] = React.useState<boolean>(false);
    const [supplierType, setSupplierType] = React.useState<false | number>(false);

    const { idMerchant } = useAppSelector((state) => state.user);
    const resolver = zodResolver(zFactory)
    const form = useForm<IProvider>({
        resolver,
        defaultValues: {
            idMerchant: parseInt(idMerchant) ?? 0,
            "employees":{
                "women": "0",
                "men": "0",
                "total": "0"
            },
            commercialRelationDate: undefined

        }, 
        
    })
    const {
        mutateAsync: createProdAsync,
        isLoading: productLoading,
        isError: productError,
        isSuccess: productSuccess,
    } = useMutation(async () => {
        console.log("Saving info")
        return true
    });

    const [seed, setSeed] = useState(1);
    const [valueTest, setValueTest] = useState({});

    
    const queryFormStrucutre = useQuery(['getSupplierFormData'], getSupplierFormData)


    useEffect(() => {
        form.setValue('idMerchant', parseInt(idMerchant))
    }, [idMerchant])

    useEffect(() => {
        form.watch((value, info) => {
            setValueTest(value)

            if(value.supplierTypeId !== undefined){
                setSupplierType(value.supplierTypeId)
            }

            if(info.name == 'employees.men' || info.name == 'employees.women'){
                let woman = parseInt(value.employees?.women+"" ?? 0)
                woman = isNaN(woman) ? 0 : woman

                let men = parseInt(value.employees?.men+"" ?? 0)
                men = isNaN(men) ? 0 : men
                
                form.setValue('employees.total', (men + woman)+"")
            }
            let firstPartName = info.name ? info.name.split('.')[0] : ''
            if(info.name && value && ['planet', 'people', 'product'].includes(firstPartName) && info.name.split('.')[2] == 'check'){
                let certificationValue = value.planet && value[firstPartName][parseInt(info.name.split('.')[1])]
                if(certificationValue && certificationValue.check){
                    setOpenCertification(info.name)
                    let name:any = info.name.replace('.check', '.date')
                    form.setValue(name, new Date())
                }else{
                    form.setValue(info.name.replace('.check', '.date') as any, undefined)
                    form.setValue(info.name.replace('.check', '.scope') as any, undefined)
                }
            }

        })
    }, [])

    const onSave = async (formData) => {
        let formated_form = supplierFormToQuery({...formData, idMerchant}, queryFormStrucutre.data)

        console.log('pre-send',formated_form)
        setLoadingSave(true)
        setErrorMessage(false)
        setSuccessMessage(false)
        try{

        let result = await saveSupplier(formated_form)
        setLoadingSave(false)
        setSuccessMessage(true)
        form.reset()
        }catch(err:any){
            setErrorMessage(getErrorMessage(err))
            setLoadingSave(false)
        }

        
    }

    const loading = useMemo(() => {
        return !(seed && queryFormStrucutre.data)
    }, [seed, queryFormStrucutre.data])
    
    return (
        <>
            <Container>
                {loading ? (
                    <Grid container justifyContent="center" alignItems="center" sx={{minHeight: '90vh'}}>
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                ) 
                : typeof supplierType != 'number' ? (
                    <Grid container justifyContent="center" sx={{minHeight: '90vh'}}>

                    <SelectTypeForm 
                        supplierTypes={queryFormStrucutre.data?.supplierTypes ?? []} 
                        onSelected={(type) => {
                            form.setValue('supplierTypeId', type)
                        }} 
                    />
                    </Grid>

                ) : (

                    <Content>
                        {/* {JSON.stringify(valueTest)} */}
                        
                        <Button 
                        startIcon={<ArrowBack/>}
                        onClick={() => setSupplierType(false)}
                        sx={{mb: 1}}
                        >
                            Volver a selecciónar tipo de proveedor
                        </Button>

                        {/* { form.formState.errors &&
                                <div>{JSON.stringify(form.formState.errors)}</div>
                            } */}
                            {errorMessage && <Alert severity="error" sx={{mb:1}}>{errorMessage}</Alert>}
                            {successMessage && <Alert severity="success" sx={{mb:1}}>Proveedor creado</Alert>}
                        <FormStructureContext.Provider value={queryFormStrucutre.data}>
                        <Form
                            
                            methods={form}
                            onSubmit={onSave}
                            id="new-supplier-form"
                        >
                            <CertificationModal 
                                active={openCertification}
                                onClose={() => setOpenCertification(false)}
                            />
                            {
                                supplierType == 1 ? (
                                    <FactoryForm/>
                                ) :
                                [2,3].includes(supplierType) ? (
                                    <MultiSupplierForm/>
                                ) :
                                supplierType == 4 ? (
                                    <WorkshopForm/>
                                ) : (
                                    <h1>Formulario no soportado</h1>
                                )
                            }
                            
                        </Form>
                        </FormStructureContext.Provider>
                    </Content>
                )}<Footer />
                </Container>
    
                {productLoading && <ScreenLoader loading={true} />}
                {productSuccess && (
                    <Snackbars
                        openSnack={true}
                        messageSnack={{
                            message: "Producto creado correctamente!",
                            key: new Date().getTime(),
                        }}
                    />
                )}
                {productError && (
                    <Snackbars
                        openSnack={true}
                        messageSnack={{
                            message: "Parece que salió mal, intentalo nuevamente",
                            key: new Date().getTime(),
                        }}
                    />
                )}
        </>
    )


    return (
        <>
            <Container>

                {loading ? (
                    <Grid container justifyContent="center" alignItems="center" sx={{minHeight: '90vh'}}>
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                ) : (
                    <Content>
                        {JSON.stringify(valueTest)}
                        
                        { form.formState.errors &&
                                <div>{JSON.stringify(form.formState.errors)}</div>
                            }
                            {errorMessage && <Alert severity="error" sx={{mb:1}}>{errorMessage}</Alert>}
                            {successMessage && <Alert severity="success" sx={{mb:1}}>Proveedor creado</Alert>}
                        <FormStructureContext.Provider value={queryFormStrucutre.data}>
                        <Form
                            
                            methods={form}
                            onSubmit={onSave}
                            id="new-supplier-form"
                        >
                            
                            <CertificationModal 
                                active={openCertification}
                                onClose={() => setOpenCertification(false)}
                            />
                            <Box>

                                <CardBase
                                    header="INFORMACIÓN GENERAL"
                                    content={<GeneralCard />}
                                />
                                <CardBase
                                    header="Personas"
                                    content={<PeopleCard />}
                                />

                            </Box>
                            <Box>

                                <CardBase
                                    header="Producto & Alcance"
                                    content={<ProductCard />}
                                />
                                <CardBase
                                    header="Planeta"
                                    content={<CertificationCard />}
                                />
                            </Box>
                        </Form>
                        </FormStructureContext.Provider>
                    </Content>
                )}

                <Footer />
            </Container>

            {productLoading && <ScreenLoader loading={true} />}
            {productSuccess && (
                <Snackbars
                    openSnack={true}
                    messageSnack={{
                        message: "Producto creado correctamente!",
                        key: new Date().getTime(),
                    }}
                />
            )}
            {productError && (
                <Snackbars
                    openSnack={true}
                    messageSnack={{
                        message: "Parece que salió mal, intentalo nuevamente",
                        key: new Date().getTime(),
                    }}
                />
            )}
        </>
    );
}


export { NewProvider }