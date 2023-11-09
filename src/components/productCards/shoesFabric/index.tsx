import React from "react";
import { Fabrics } from "../materials/fabrics";

export const ShoesFabric = () => {
    const shoesFabrics = [
        { id: 0, title: "FONDO" },
        { id: 1, title: "CAPELLADA" },
        { id: 2, title: "INTERIOR" },
    ];

    return (
        <>
            {shoesFabrics.map(({ id, title }) => (
                <Fabrics key={id} fabricNumber={id} title={title} />
            ))}
        </>
    );
};
