import React from "react";
import { v4 as uuid } from "uuid";
import { SizeCurveTable } from "./sizeCurveTable/SizeCurveTable";
import { useAppSelector } from "@/state/app/hooks";

export const SizeCurve = () => {
    const updateData = useAppSelector((state) => state.updatedProduct);
    const { curve } = useAppSelector((state) => state.updatedProduct);

    const fabrics = updateData?.telas;

    return (
        <>
            {fabrics?.map((fabric, index) => (
                <SizeCurveTable
                    key={uuid()}
                    combo={index + 1}
                    curve={curve}
                    type={updateData?.sizeCurveType}
                    quantityOfCombo={updateData?.quantity}
                />
            ))}
        </>
    );
};
