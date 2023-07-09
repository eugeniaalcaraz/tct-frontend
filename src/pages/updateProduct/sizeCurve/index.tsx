import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { SizeCurveTable } from "./sizeCurveTable/SizeCurveTable";
import { useAppSelector } from "@/state/app/hooks";

const clothes = [0, 0, 1, 2, 4, 3, 2, 0, 0, 0, 0, 0];

export const SizeCurve = () => {
    const updateData = useAppSelector((state) => state.updatedProduct);

    const fabrics = updateData?.telas;

    return (
        <>
            {fabrics?.map((fabric, index) => (
                <SizeCurveTable
                    key={uuid()}
                    combo={index + 1}
                    curve={
                        fabric?.colors[0]?.sizeCurve ||
                        fabric?.prints[0]?.sizeCurve ||
                        []
                    }
                    type={updateData.sizeCurveType}
                    quantityOfCombo={fabric?.quantity}
                />
            ))}
        </>
    );
};
