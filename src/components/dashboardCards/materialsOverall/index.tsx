import React from "react";
import { PieWithLabels } from "@components/common/graphs";
import { useAppSelector } from "@/state/app/hooks";

const MaterialsOverall = () => {
    const { resumenDeMaterialidades } = useAppSelector(
        (state) => state.dashboard
    );

    const data = resumenDeMaterialidades?.map((material) => ({
        name: material.Description,
        value: Number(material.Percentage),
        weight: Number(material.Weight),
    }));

    return <PieWithLabels data={data} />;
};

export { MaterialsOverall };
