import React from "react";
import { SizeCurveTable } from "./sizeCurveTable/SizeCurveTable";
import { useAppSelector } from "@/state/app/hooks";

const clothes = [0, 0, 1, 2, 4, 3, 2, 0, 0, 0, 0, 0];

export const SizeCurve = () => {
    const updateData = useAppSelector((state) => state.updatedProduct);

    return (
        <SizeCurveTable
            combo={1}
            curve={clothes}
            type={updateData.sizeCurveType}
            quantityOfCombo={9720}
        />
    );
};
