import React from "react";

import { PieChartGraph } from "@components/common/graphs";
import { useAppSelector } from "@/state/app/hooks";

const ProductionStatus = () => {
    const { estadoDeProduccion } = useAppSelector((state) => state.dashboard);

    const data = estadoDeProduccion?.map((data) => ({
        ...data,
        percentage: Number(data.Percentage),
        status: data.Status,
    }));

    return <PieChartGraph data={data} />;
};

export { ProductionStatus };
