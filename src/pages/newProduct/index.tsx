import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidation } from "./productValidation";
import {
    CardBase,
    Footer,
    Form,
    ScreenLoader,
    Snackbars,
} from "@components/common";

import { Box } from "@mui/material";

import { Container, Content } from "./NewProductStyles";
import {
    ProductCard,
    Materials,
    Attachments,
    Trading,
    Shipment,
    SizeCurve,
} from "@components/productCards";
import { useAppSelector } from "@/state/app/hooks";

import { createProduct } from "@/services/ProductRequests";
import { toBase64 } from "@/utils/toBase64";
import { useMutation } from "@tanstack/react-query";

const product = {
    producto: <ProductCard />,
    adjuntos: <Attachments />,
    compraYVenta: <Trading />,
    embarque: <Shipment />,
    materiales: <Materials />,
    curvaDeTalles: <SizeCurve />,
};

const NewProduct = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const { combos, trimCombos } = useAppSelector((state) => state.product);
    const resolver = yupResolver(productValidation);
    const {
        mutateAsync: createProdAsync,
        isLoading: productLoading,
        isError: productError,
        isSuccess: productSuccess,
    } = useMutation(createProduct);

    const [seed, setSeed] = useState(1);

    const onSave = async (formData) => {
        const formattedDate = formData.fecha.format("YYYY-MM-DD");
        let fotos;

        if (formData.fotos) {
            const files = Object.values(formData.fotos);
            const response = files.map((file) => toBase64(file));
            const picturesArray = await Promise.all(response);
            fotos = picturesArray.map((picture, i) => ({
                pic: picture,
                isMain: i === 0 ? 1 : 0,
            }));
        } else {
            fotos = [];
        }

        createProdAsync({
            formData: {
                ...formData,
                fecha: formattedDate,
                fotos,
                combos,
                trimCombos,
            },
            idMerchant,
            existingQuality: formData.existingQuality,
        });

        setSeed(Math.random());
    };

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
                                    header="Producto"
                                    content={product["producto"]}
                                />

                                <CardBase
                                    header="Adjuntos"
                                    content={product["adjuntos"]}
                                />
                                <CardBase
                                    header="Compra y venta"
                                    content={product["compraYVenta"]}
                                />
                                <CardBase
                                    header="Embarque"
                                    content={product["embarque"]}
                                />
                            </Box>
                            <Box>
                                <CardBase
                                    header="Materiales"
                                    content={product["materiales"]}
                                />
                                <CardBase
                                    header="Curva de talles"
                                    content={product["curvaDeTalles"]}
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
};

export { NewProduct };
