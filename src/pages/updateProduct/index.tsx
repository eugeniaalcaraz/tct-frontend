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
import React from "react";
import { Form } from "@components/common";
import { Container, Content, StyledTableRow } from "./UpdateProductStyles";
import { useForm } from "react-hook-form";
import { GeneralDetails } from "./generalDetails";
import { CostAndMargin } from "./costAndMargins";
import { Materials } from "./materials";
import { Trims } from "./trims";
import { Shipment } from "./shipment";
import { SizeCurve } from "./sizeCurve";
import { StatusLabel } from "./stateLabel";

export const UpdateProduct = () => {
    const methods = useForm();

    const onUpdate = () => {
        console.log("onSave");
    };
    return (
        <>
            <Container>
                <Content>
                    <Stack
                        direction={"row"}
                        gap={"15px"}
                        style={{
                            borderBottom: "#839270 2px solid",
                            alignItems: "center",
                        }}
                    >
                        <h1>{"01S2404001 - ${Tipo de muestra}"}</h1>
                        <StatusLabel status={"enviado"} />
                        <div>{"{fechaEnvio}"}</div>
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

                            {/* materiales */}
                            <Materials />
                            {/* avios */}
                            <Trims />
                            {/* embarque */}
                            <Shipment />
                            {/* curva de talles */}
                            <SizeCurve />
                            {/* tabla de medidas */}
                        </Stack>
                    </Form>
                </Content>
            </Container>
        </>
    );
};
