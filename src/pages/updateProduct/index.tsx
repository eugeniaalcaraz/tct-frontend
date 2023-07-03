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

export const UpdateProduct = () => {
    const methods = useForm();
    const { updateProduct } = useAppSelector((state) => state.product);
    const { mutateAsync, isLoading } = useMutation(getProductById);

    const { id } = useParams();
    const dispatch = useAppDispatch();

    const productInfo = updateProduct?.basicInfo[0];

    const onUpdate = () => {
        console.log("onSave");
    };

    const loadProduct = async () => {
        dispatch(setUpdateProduct(await mutateAsync(id)));
    };

    useEffect(() => {
        if (updateProduct === undefined || updateProduct === null)
            loadProduct();
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
                        <h1>01S2404001 - {productInfo?.sampleType}</h1>
                        <StateOptions
                            status={getStatus(productInfo?.idSampleStatus)}
                            id={{ index: 0, item: "sample" }}
                        />
                        <div>
                            {dayjs(productInfo?.sampleDate).format(
                                "YYYY-MM-DD"
                            )}
                        </div>
                    </Stack>
                    <Form
                        // resolver={resolver}
                        methods={methods}
                        onSubmit={onUpdate}
                        id="update-product-form"
                    >
                        <Stack gap={"50px"}>
                            {/* detalles generales */}
                            <GeneralDetails />
                            {/* costos y margenes */}
                            <CostAndMargin />
                            {/* TODO telas.map((tela)=><Materials/>)*/}
                            {/* materiales */}
                            <Materials />
                            {/* avios */}
                            {/* TODO avios.map((avio)=><Trims/>)*/}
                            <Trims />
                            {/* embarque */}
                            <Shipment />
                            {/* curva de talles */}
                            <SizeCurve />
                            {/* tabla de medidas */}
                            <Measurements />
                        </Stack>
                    </Form>
                </Content>
            </Container>
            {isLoading && <ScreenLoader loading={true} />}
        </>
    );
};
