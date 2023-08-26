import { CertificationCard } from "@components/providerCards/CertificationCard";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppSelector } from "@/state/app/hooks";
import { useMutation } from "@tanstack/react-query";
import {
    CardBase,
    Footer,
    Form,
    ScreenLoader,
    Snackbars,
} from "@components/common";
import { Container, Content } from "../newProduct/NewProductStyles";
import { Box } from "@mui/material";
import { PeopleCard } from "@components/providerCards/PeopleCard";
import { GeneralCard } from "@components/providerCards/GeneralCard";


const NewProvider = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const resolver = yupResolver(yup.object());
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


    const onSave = async (formData) => {

    }

    return (
        <>
            <Container>
                {seed && (
                    <Content>
                        <Form
                            resolver={resolver}
                            onSubmit={onSave}
                            id="new-product-form"
                        >
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
                                    header="Planeta"
                                    content={<CertificationCard />}
                                />
                            </Box>
                        </Form>
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