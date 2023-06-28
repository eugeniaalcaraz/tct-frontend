import React from "react";
import { SizeCurveTable } from "./sizeCurveTable/SizeCurveTable";

const clothes = [0, 0, 1, 2, 4, 3, 2, 0, 0, 0, 0, 0];

export const SizeCurve = () => {
    return (
        <SizeCurveTable
            combo={1}
            curve={clothes}
            type={1}
            quantityOfCombo={9720}
        />
    );
};
