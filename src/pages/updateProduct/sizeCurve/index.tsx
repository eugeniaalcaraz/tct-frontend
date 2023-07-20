import React from "react";
import { v4 as uuid } from "uuid";
import { SizeCurveTable } from "./sizeCurveTable/SizeCurveTable";
import { useAppSelector } from "@/state/app/hooks";

export const SizeCurve = () => {
    const updateData = useAppSelector((state) => state.updatedProduct);

    const fabrics = updateData?.telas;
    const curve =
        fabrics[0]?.colors[0]?.sizeCurve || fabrics[0]?.prints[0]?.sizeCurve;

    const adjustedCurve = curve?.slice(0, curve.length - 1);

    console.log(curve, adjustedCurve);

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
