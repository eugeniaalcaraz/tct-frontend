import { MenuItem, Select, Stack } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Form } from "@components/common";
import { Container, Content } from "./UpdateProductStyles";
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
import { getSampleType, getStatus, getStatusId } from "@/utils";
import { useParams } from "react-router-dom";
import {
    setIndustriesByUnit,
    setTipologiesByIndustry,
    setUpdateProduct,
} from "@/state/features/product";
import {
    getMerchantIndustryDropdownValue,
    getMerchantTypologyDropdownValue,
    getProductById,
} from "@/services/ProductRequests";
import { useMutation } from "@tanstack/react-query";
import { ScreenLoader } from "@components/common";
import { setData, updateSampleStatus } from "@/state/features/updatedProduct";

export const UpdateProduct = () => {
    const methods = useForm();
    const { idMerchant } = useAppSelector((state) => state.user);
    const { updateProduct, edition } = useAppSelector((state) => state.product);
    const {
        sampleType,
        idSampleStatus,
        sampleDate,
        idMerchantBrand,
        idSeason,
        year,
        productNumber,
        idIndustry,
        idDepartment,
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

    const updateIndustriesAndTipologies = async () => {
        dispatch(
            setIndustriesByUnit(
                await getMerchantIndustryDropdownValue({
                    idManagementUnit: idDepartment,
                    idMerchant,
                })
            )
        );
        dispatch(
            setTipologiesByIndustry(
                await getMerchantTypologyDropdownValue({
                    idIndustry,
                })
            )
        );
    };

    const loadProductState = () => {
        dispatch(
            setData({
                idProduct: id,
                idManagmentUnit: productInfo?.idManagmentUnit,
                productNumber: productInfo?.productNumber,
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
                    description: fabric?.description,
                    consumption: fabric?.consumption,
                    weight: fabric?.weight,
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
                    idShipping: fabric?.idshipping,
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
                    colors: trim?.colors?.map((color) => ({
                        idColor: color?.idcolor,
                        idStatus: color?.idstatus,
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
                        pic: productInfo?.productPicture,
                        isMain: 1,
                    },
                ],
                entryDate: fabrics && fabrics[0]?.entryDate,
                shippingDate: fabrics && fabrics[0]?.shippinDate,
                warehouseEntryDate: fabrics && fabrics[0]?.warehouseEntryDate,
                curve:
                    fabrics && fabrics[0]?.comboColors[0]?.sizeCurve[0]
                        ? Object.values(
                              fabrics[0]?.comboColors[0]?.sizeCurve[0]
                          )
                        : fabrics && fabrics[0]?.comboPrints[0]?.sizeCurve[0]
                        ? Object.values(
                              fabrics[0]?.comboPrints[0]?.sizeCurve[0]
                          )
                        : productInfo?.sizeCurveType === 3
                        ? Array.from(Array(9), () => 0)
                        : productInfo?.sizeCurveType == 2
                        ? Array.from(Array(13), () => 0)
                        : Array.from(Array(7), () => 0),
            })
        );
    };

    const handleSampleUpdate = (stateInfo) => {
        const { status } = stateInfo;
        dispatch(updateSampleStatus(getStatusId(status)));
    };

    useEffect(() => {
        if (updateProduct === undefined || updateProduct === null) {
            loadProduct();
        } else {
            loadProductState();
        }
    }, [updateProduct]);

    useEffect(() => {
        updateIndustriesAndTipologies();
    }, [idIndustry, idDepartment]);

    useEffect(() => {
        console.log(sampleType);
    }, [sampleType]);

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
                            height: "54px",
                        }}
                    >
                        <h1>
                            {idMerchantBrand}
                            {idSeason}
                            {year}
                            {productNumber} -{" "}
                            {edition ? (
                                <Select
                                    size="small"
                                    sx={{
                                        width: "fit-content",
                                        fontSize: "32px",
                                        fontWeight: 700,
                                        lineHeight: "44px",
                                        textAlign: "left",
                                    }}
                                    variant="standard"
                                    value={sampleType}
                                    onChange={(e) =>
                                        dispatch(
                                            setData({
                                                sampleType: e.target.value,
                                            })
                                        )
                                    }
                                >
                                    <MenuItem value={1}>Aprobación</MenuItem>
                                    <MenuItem value={2}>
                                        Pre Producción
                                    </MenuItem>
                                    <MenuItem value={3}>Producción</MenuItem>
                                </Select>
                            ) : (
                                getSampleType(sampleType)
                            )}
                        </h1>
                        <StateOptions
                            status={getStatus(Number(idSampleStatus))}
                            id={{ index: 0, item: "sample" }}
                            updateAction={handleSampleUpdate}
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
