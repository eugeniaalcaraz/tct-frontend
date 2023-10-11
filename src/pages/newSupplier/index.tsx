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
import { Alert, Box, CircularProgress, Grid } from "@mui/material";
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


export const zSupplier = z.object({
    idMerchant: z.number(),
    supplierTypeId: z.number(),
    alias: z.string({required_error: 'Requerido'}).min(1, 'Requerido'),
    comercialName: z.string().optional(),
    vatNumber: z.string({required_error: 'Requerido'}).min(1, 'Requerido'),
    country: z.string({required_error: 'Requerido'}).min(1, 'Requerido'),
    address: z.string({required_error: 'Requerido'}).min(1, 'Requerido'),
    contactPerson: z.string().optional(),
    email: z.string().optional().refine(value => {
        if (!value || value.length === 0) return true; // allow empty string
        return z.string().email().safeParse(value).success;
      }, { message: "Email invalido" }),
    commercialRelationDate: z.date(),
    estimatedAnualOrder: z.string().default("0"),
    anualContract: z.boolean().default(false),
    employees: z.object({
        women: z.string().default("0"),
        men: z.string().default("0"),
        total: z.string().default("0"),
    }),
    productTypes: z.array(z.string({required_error: 'Requerido'})).min(1, 'Requerido'),
    planet: z.array(z.union([z.object({
        check: z.boolean().optional(),
        date: z.date().optional(),
        scope: z.boolean().optional(),
    }), z.undefined(), z.null()])).optional(),
    people: z.array(z.union([z.object({
        check: z.boolean().optional(),
        date: z.date().optional(),
        scope: z.boolean().optional(),
    }), z.undefined(), z.null()])).optional(),




})

const NewProvider = () => {
    const [openCertification, setOpenCertification] = React.useState<false | string>(false);
    const [loadingSave, setLoadingSave] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<false | string>(false);
    const [successMessage, setSuccessMessage] = React.useState<boolean>(false);

    const { idMerchant } = useAppSelector((state) => state.user);
    const resolver = zodResolver(zSupplier)
    const form = useForm<IProvider>({
        resolver,
        defaultValues: {
            idMerchant: parseInt(idMerchant) ?? 0,
            supplierTypeId: 1,
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


    const getSupplierPopulated = async () => {

        let result = await getSupplierFormData()
        result.productCertifications = listCertProduct
        console.log(result)
        return result
    }
    
    const queryFormStrucutre = useQuery(['getSupplierFormData'], getSupplierPopulated)


    useEffect(() => {
        form.setValue('idMerchant', parseInt(idMerchant))
    }, [idMerchant])

    useEffect(() => {
        form.watch((value, info) => {
            setValueTest(value)

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
                ) : (
                    <Content>
                        {/* {JSON.stringify(valueTest)} */}
                        {JSON.stringify(Object.keys(queryFormStrucutre.data))}
                        {/*
                        { form.formState.errors &&
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