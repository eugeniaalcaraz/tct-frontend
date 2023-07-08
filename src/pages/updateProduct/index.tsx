import {
    Box,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Form } from "@components/common";
import { Container, Content, StyledTableRow } from "./UpdateProductStyles";
import { useForm } from "react-hook-form";
import { GeneralDetails } from "./generalDetails";
import { CostAndMargin } from "./costAndMargins";
import { Materials } from "./materials";
import { Trims } from "./trims";
import { Shipment } from "./shipment";
import { SizeCurve } from "./sizeCurve";
import { Measurements } from "./measurements";
import StateOptions from "./stateLabel/StateOptions";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { getStatus } from "@/utils";
import { useParams } from "react-router-dom";
import { setUpdateProduct } from "@/state/features/product";
import { getProductById } from "@/services/ProductRequests";
import { useMutation } from "@tanstack/react-query";
import { ScreenLoader } from "@components/common";
import { setData } from "@/state/features/updatedProduct";

export const UpdateProduct = () => {
    const methods = useForm();
    const { updateProduct } = useAppSelector((state) => state.product);
    const {
        sampleType,
        idSampleStatus,
        sampleDate,
        idMerchantBrand,
        idSeason,
        year,
    } = useAppSelector((state) => state.updatedProduct);
    const { mutateAsync, isLoading } = useMutation(getProductById);

    const { id } = useParams();
    const dispatch = useAppDispatch();

    const productInfo = updateProduct?.basicInfo[0];
    const fabrics = updateProduct?.fabrics;
    const trims = updateProduct?.avios;

    const onUpdate = (formData) => {
        console.log(formData);
    };

    const loadProduct = async () => {
        dispatch(setUpdateProduct(await mutateAsync(id)));
    };

    const loadProductState = () => {
        dispatch(
            setData({
                idSampleStatus: productInfo?.idSampleStatus,
                sampleDate: dayjs(productInfo?.sampleDate).format("YYYY-MM-DD"),
                idMerchantBrand: 1,
                idSeason: productInfo?.idSeason,
                year: productInfo?.year,
                idDepartment: 1,
                idIndustry: productInfo?.idIndustry,
                idTipology: productInfo?.idTipology,
                idConcept: productInfo?.idConcept,
                idLine: productInfo?.idLine,
                idBodyFit: productInfo?.idBodyFit,
                idRise: productInfo?.idRise,
                detail: productInfo?.detail,
                proyecta: productInfo?.proyecta,
                cost: productInfo?.cost,
                idCountry: productInfo?.idCountry,
                idSupplier: productInfo?.idSupplier,
                quantity: productInfo?.quantity,
                fabricCode: productInfo?.fabricCode,
                idModelingStatus: 1,
                sampleType: productInfo?.sampleType,
                telas: fabrics?.map((fabric) => ({
                    idFabric: fabric?.idFabric,
                    idStatus: fabric?.idStatus,
                    description: "", //fabric?.description,
                    consumption: fabric?.consumption,
                    weight: "", //fabric?.weight,
                    placement: fabric?.idPlacement,
                    composition: [
                        {
                            idFiber: 1,
                            percentage: 100,
                        },
                    ],
                    colors: fabric?.comboColors.map((combo) => ({
                        idColor: combo?.idColor,
                        sizeCurve: combo?.sizeCurve,
                        idStatus: combo?.idStatus,
                    })),
                    prints: fabric?.comboPrints.map((print) => ({
                        nombre: "name",
                        cantidadColor: "2",
                        sizeCurve: print?.sizeCurve,
                        idStatus: print?.idStatus,
                    })),
                    entryDate: fabric?.entryDate,
                    shippingDate: fabric?.shippinDate,
                    warehouseEntryDate: fabric?.warehouseEntryDate,
                    idCountryDestination: fabric?.idCountryDestination,
                    idShipping: fabric?.idShipping,
                    quantity: fabric?.quantity,
                })),
                avios: trims?.map((trim) => ({
                    idAvio: trim?.idAvio,
                    idStatus: trim?.idStatus,
                    idColor: 1,
                    quantity: trim?.quantity,
                    idShipping: trim?.idShipping,
                    idCountryDestination: trim?.idCountryDestination,
                    shippingDate: trim?.shippinDate,
                    entryDate: trim?.entryDate,
                    warehouseEntryDate: trim?.warehouseEntryDate,
                    colors: trim.colors.map((color) => ({
                        idColor: color.idcolor,
                        idStatus: color.idstatus,
                    })),
                })),
                sizeCurveType: productInfo?.sizeCurveType,
                extendedSize: productInfo?.extendedSize,
                idDesigner: productInfo?.idDesigner,
                idMerchant: productInfo?.idMerchant,
                idExistingProduct: "1",
                name: productInfo?.name,
                idModeling: productInfo?.idModeling,
                weight: productInfo?.weight,
                modelingDate: productInfo?.modelingDate,
                idCareLabel: "1",
                measurmentTable: productInfo?.measurementTable,
                idStatusMeasurmentTable: productInfo?.idStatusMeasurmentTable,
                idShoeMaterial: productInfo?.idShoeMaterial,
                costInStore: productInfo?.costInStore,
                pictures: [
                    {
                        pic: "data:image/png;base64,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",
                        isMain: 1,
                    },
                ],
                entryDate: fabrics && fabrics[0].entryDate,
                shippingDate: fabrics && fabrics[0].shippinDate,
                warehouseEntryDate: fabrics && fabrics[0].warehouseEntryDate,
            })
        );
    };

    useEffect(() => {
        if (updateProduct === undefined || updateProduct === null) {
            loadProduct();
        } else {
            loadProductState();
        }
    }, [updateProduct]);

    return (
        <>
            <Container>
                <Content>
                    <Stack
                        direction={"row"}
                        gap={"15px"}
                        style={{
                            borderBottom: "#314C95 2px solid",
                            alignItems: "center",
                        }}
                    >
                        <h1>
                            {idMerchantBrand}
                            {idSeason}
                            {year}
                            {id} - {sampleType}
                        </h1>
                        <StateOptions
                            status={getStatus(idSampleStatus)}
                            id={{ index: 0, item: "sample" }}
                        />
                        <div>{dayjs(sampleDate).format("YYYY-MM-DD")}</div>
                    </Stack>
                    <Form
                        methods={methods}
                        onSubmit={onUpdate}
                        id="update-product-form"
                    >
                        <Stack gap={"50px"}>
                            <GeneralDetails />
                            <CostAndMargin />
                            <Materials />
                            <Trims />
                            <Shipment />
                            <SizeCurve />
                            <Measurements />
                        </Stack>
                    </Form>
                </Content>
            </Container>
            {isLoading && <ScreenLoader loading={true} />}
        </>
    );
};
