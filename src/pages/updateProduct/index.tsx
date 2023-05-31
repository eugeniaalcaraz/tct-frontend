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

export const UpdateProduct = () => {
    const methods = useForm();

    const onUpdate = () => {
        console.log("onSave");
    };
    return (
        <>
            <Container>
                <Content>
                    <Box>
                        <h1>{"01S2404001 - ${Tipo de muestra}"}</h1>
                    </Box>
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
                            {/* curva de talles */}
                            {/* tabla de medidas */}
                        </Stack>
                    </Form>
                </Content>
            </Container>
        </>
    );
};
