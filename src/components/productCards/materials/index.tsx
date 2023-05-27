import React, { useMemo, useState } from "react";
import { Button, Box, Tooltip } from "@mui/material";
import { Container } from "./MaterialsStyles";
import { Fabrics } from "./fabrics";
import { Trims } from "./trims";
import { ControlledDropdown } from "@components/common";

const Materials = () => {
    const [numberOfFabricsSelected, setNumberOfFabricsSelected] = useState([1]);
    const [numberOfTrimsSelected, setNumberOfTrimsSelected] = useState([1]);

    const fabricsArrOptions = useMemo(
        () =>
            Array.from(Array(Number(5)).keys()).map((value) => ({
                Id: String(value + 1),
                Description: value + 1,
            })),
        []
    );

    const trimsArrOptions = useMemo(
        () =>
            Array.from(Array(Number(11)).keys()).map((value) => ({
                Id: String(value),
                Description: value,
            })),
        []
    );

    const onSelectNumberOfFabrics = (e) => {
        setNumberOfFabricsSelected(Array.from(Array(Number(e.value)).keys()));
    };

    const onSelectNumberOfTrims = (e) => {
        setNumberOfTrimsSelected(Array.from(Array(Number(e.value)).keys()));
    };

    return (
        <Container>
            <ControlledDropdown
                label="Cantidad de telas"
                options={fabricsArrOptions}
                name="cantidadDeTelas"
                externalOnChange={onSelectNumberOfFabrics}
            />
            <h3 className="calidad">Calidad</h3>
            {numberOfFabricsSelected.map((value) => (
                <Fabrics key={value} fabricNumber={value} />
            ))}

            <ControlledDropdown
                label="Cuantos avíos tiene tu prenda?"
                options={trimsArrOptions}
                name="cantidadDeAvios"
                externalOnChange={onSelectNumberOfTrims}
            />

            {numberOfTrimsSelected.map((value) => (
                <Trims key={value} trimNumber={value} />
            ))}
        </Container>
    );
};

export { Materials };
