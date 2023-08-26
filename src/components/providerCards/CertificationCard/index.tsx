import React from "react";
import { ControlledCheckbox } from "@components/common";
import { Container } from "../ProviderStyles";
import { Typography, Box } from "@mui/material";

const certifications = [
    {
        name: "Roadmap to Zero (ZDHC)",
        value: "zdhcRoadmap"
    },
    {
        name: "Bluesign",
        value: "bluesign"
    },
    {
        name: "Oeko-Tex",
        value: "oekeoTex"
    },
    {
        name: "ISO 14000",
        value: "iso14000"
    },
    {
        name: "EMAS",
        value: "emas"
    },
    {
        name: "Global Organic Textile Standard (GOTS)",
        value: "gots"
    },
    {
        name: "Global Recycle Standard (GRS)",
        value: "grs"
    },
    {
        name: "Organic Content Standard (OCS)",
        value: "ocs"
    },
    {
        name: "Recycled Content Standard (RCS)",
        value: "rcs"
    },
]

const CertificationCard = () => {


    return (
        <Container>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h2">ES PARTE DE / CUENTA CON ALGUNA DE LAS SIGUIENTE CERTIFICACIONES/PRORAMAS</Typography>

                {
                    certifications.map((certification, index) => (
                        <ControlledCheckbox
                            key={index}
                            label={certification.name}
                            name={certification.value}
                        />
                    ))
                }
            </Box>
            <Box sx={{ rowGap: 0, display: 'flex', flexDirection: 'column' }}>

                <Typography variant="h2">LISTA DE SUSTANCIAS RESTRINGIDAS</Typography>

                <ControlledCheckbox
                    label="El proveedor cuenta con una lista de sustancias restringidas."
                    name="listRestringedSubstances"
                />
            </Box>

        </Container>
    );
};

export { CertificationCard };
