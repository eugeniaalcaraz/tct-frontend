import React from "react";
import { PieWithLabels } from "@components/common/graphs";
import { useAppSelector } from "@/state/app/hooks";

const MaterialsOverall = () => {
    const { resumenDeMaterialidades } = useAppSelector(
        (state) => state.dashboard
    );

    const data = resumenDeMaterialidades?.map((data) => ({
        ...data,
        percentage: Number(data.Percentage),
    }));

    return <PieWithLabels />;
};

export { MaterialsOverall };
