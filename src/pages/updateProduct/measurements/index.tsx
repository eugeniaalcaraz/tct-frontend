import React from "react";
import { StatusLabel } from "../stateLabel";

const Measurements = () => {
    return (
        <section>
            <h3 style={{ marginBottom: "1.5rem" }}>TABLA DE MEDIDAS</h3>
            <StatusLabel status={"aprobado"} />
        </section>
    );
};

export { Measurements };
