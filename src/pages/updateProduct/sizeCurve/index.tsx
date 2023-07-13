import React from "react";
import { v4 as uuid } from "uuid";
import { SizeCurveTable } from "./sizeCurveTable/SizeCurveTable";
import { useAppSelector } from "@/state/app/hooks";

export const SizeCurve = () => {
    const updateData = useAppSelector((state) => state.updatedProduct);
    const { curve } = useAppSelector((state) => state.updatedProduct);

    const adjustedCurve = curve.slice(0, curve.length - 1);

    const fabrics = updateData?.telas;

    return (
        <>
            <h3>CURVA DE TALLES</h3>
            {fabrics?.map((fabric, index) => (
                <SizeCurveTable
                    key={uuid()}
                    combo={index + 1}
                    curve={adjustedCurve}
                    type={updateData?.sizeCurveType}
                    quantityOfCombo={updateData?.quantity}
                />
            ))}
        </>
    );
};
