import React, { useState } from "react";
import { Button, Box, Tooltip } from "@mui/material";
import { Container } from "./MaterialsStyles";
import { Fabrics } from "./fabrics";
import { Trims } from "./trims";
import { ControlledDropdown } from "@components/common";

const Materials = () => {
    const [numberOfFabricsSelected, setNumberOfFabricsSelected] = useState([1]);

    const fabricsArrOptions = [
        { Id: "1", Description: 1 },
        { Id: "2", Description: 2 },
        { Id: "3", Description: 3 },
        { Id: "4", Description: 4 },
        { Id: "5", Description: 5 },
    ];

    const onSelectNumberOfFabrics = (e) => {
        setNumberOfFabricsSelected(Array.from(Array(Number(e.value)).keys()));
    };

    return (
        <Container>
            <ControlledDropdown
                label="Cantidad de telas"
                options={fabricsArrOptions}
                name="cantidadDeTelas"
                externalOnChange={onSelectNumberOfFabrics}
            />
            {numberOfFabricsSelected.map((value) => (
                <Fabrics key={value} />
            ))}

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
