import React, { useEffect, useMemo, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";

import { createProduct } from "@/services/ProductRequests";
import { toBase64 } from "@/utils/toBase64";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { NumberSizeCurve } from "@components/productCards/sizeCurve/numberSizeCurve";
import {
    defaultValues,
    denimSizes,
    shoesSizes,
    sizeCurveTableTypeChooser,
} from "./aux/aux";
import {
    clearAviosCombos,
    clearReduxErrors,
    clearTelasCombos,
    setMutationState,
    setReduxErrors,
    setSpecialSizeCurve,
} from "@/state/features/product";
import dayjs from "dayjs";
import { managementUnitEnum } from "./enum";

const NewProduct = () => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const {
        telas,
        avios,
        specialSizeCurve,
        tipology,
        reduxErrors,
        errors,
        managementUnit,
    } = useAppSelector((state) => state.product);
    const [isExisting, setIsExisting] = useState(false);
    const [selectedManagmentUnit, setSelectedManagementUnit] = useState(0);
    const resolver = yupResolver(productValidation);
    const methods = useForm({ resolver, defaultValues });
    const dispatch = useAppDispatch();
    const isShoeSelected = useMemo(
        () =>
            selectedManagmentUnit ===
            (managementUnit?.find((managementUnitObj) =>
                (managementUnitObj.Description as string).includes(
                    managementUnitEnum.SHOES
                )
            )?.Id ?? 10000),
        [selectedManagmentUnit, managementUnit]
    );
    const isDenimSelected = useMemo(
        () =>
            selectedManagmentUnit ===
            (managementUnit?.find((managementUnitObj) =>
                (managementUnitObj.Description as string).includes(
                    managementUnitEnum.DENIM
                )
            )?.Id ?? 10000),
        [selectedManagmentUnit, managementUnit]
    );

    const {
        mutateAsync: createProdAsync,
        isLoading: productLoading,
        isError: productError,
        isSuccess: productSuccess,
    } = useMutation(createProduct);

    const [seed, setSeed] = useState(1);

    const onSave = async (formData, e) => {
        let fotos;
        let medidas;

        dispatch(setMutationState(false));
        if (formData.fotos.length) {
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

        if (formData.medidas.length) {
            const files = Object.values(formData.medidas);
            const response = files.map((file) => toBase64(file));
            const excelArr = await Promise.all(response);
            medidas = excelArr[0];
        } else {
            medidas = "";
        }

        // esto es lo que recibo en tipology
        // {
        //     "Id": 1,
        //     "Description": "Remera",
        //     "Code": "AAAA",
        //     "Weight": "11"
        // },
        // {
        //     "Id": 2,
        //     "Description": "Zapato",
        //     "Code": "BBBB",
        //     "Weight": "10"
        // },
        // {
        //     "Id": 3,
        //     "Description": "Jean",
        //     "Code": "CCC",
        //     "Weight": "50"
        // }
        // este es el enum de back
        // const sizeCurveEnum = {
        //     shoe: 1,
        //     clothes: 2,
        //     denim: 3
        //   };

        // const sizeCurveTypeChooser = {
        //     2: 1,
        //     1: 2,
        //     3: 3,
        // };

        createProdAsync({
            formData: {
                ...formData,
                fotos,
                medidas,
                telas,
                avios,
                sizeCurveType: sizeCurveTableTypeChooser(
                    Number(formData.idManagementUnit)
                ),
                extendedSize: specialSizeCurve,
                modelingDate: dayjs().format("YYYY-MM-DD"),
                sampleDate: dayjs().format("YYYY-MM-DD"),
                weight: tipology?.find(
                    (tipology) => tipology.Id === formData.idTipology
                )?.Weight,
            },
            idMerchant,
            existingQuality: formData.existingQuality,
        });
    };

    const product = {
        producto: (
            <ProductCard setSelectedManagmentUnit={setSelectedManagementUnit} />
        ),
        adjuntos: <Attachments />,
        compraYVenta: <Trading formMethods={methods} />,
        embarque: <Shipment />,
        materiales: <Materials isShoe={isShoeSelected} />,
        curvaDeTalles:
            isDenimSelected || isShoeSelected ? (
                <NumberSizeCurve
                    sizes={isShoeSelected ? shoesSizes : denimSizes}
                />
            ) : (
                <SizeCurve />
            ),
    };

    useEffect(() => {
        console.log({ isDenimSelected, isShoeSelected });
    }, [selectedManagmentUnit]);

    useEffect(() => {
        if (productSuccess) {
            dispatch(setSpecialSizeCurve(false));
            dispatch(setMutationState(true));
            dispatch(clearTelasCombos());
            dispatch(clearAviosCombos());
            setSeed(Math.random());
            dispatch(
                setReduxErrors({ idError: "initialError", msg: "initial" })
            );
            methods.reset(defaultValues, { keepDefaultValues: true });
        }

        if (reduxErrors && Object.keys(reduxErrors).length) {
            dispatch(clearReduxErrors());
        }
    }, [productSuccess]);

    return (
        <>
            <Container>
                {seed && (
                    <Content>
                        <Form
                            // resolver={resolver}
                            methods={methods}
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
                                    header="Proveedores y Embarque"
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
