import React from "react";
import { Button, Box, Tooltip } from "@mui/material";
import { Container } from "./MaterialsStyles";
import { Fabrics } from "./fabrics";
import { Trims } from "./trims";

const Materials = () => {
    return (
        <Container>
            <Fabrics />
            <Box className="add">
                <hr />
                <Tooltip title="Proximamente 😉" placement="right" arrow>
                    <Button variant="text" type="button" color="primary">
                        + AGREGAR CALIDAD
                    </Button>
                </Tooltip>
                <hr />
            </Box>
            <Trims />
            <Box className="add">
                <hr />
                <Tooltip title="Proximamente 😉" placement="right" arrow>
                    <Button variant="text" type="button" color="primary">
                        + AGREGAR AVÍO
                    </Button>
                </Tooltip>
                <hr />
            </Box>
        </Container>
    );
};

export { Materials };
