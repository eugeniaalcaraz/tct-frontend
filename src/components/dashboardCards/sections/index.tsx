import React, { FC, useEffect, useState } from "react";
import { LayoutType } from "recharts/types/util/types";
import { BarChartGraph } from "@/components/common/graphs";
import { SkuType } from "@/types";
import { useAppSelector } from "@/state/app/hooks";

interface sectionsObject {
    [key: string]: SkuType[];
}

type SectionProps = {
    name: string;
    layout?: LayoutType;
};

const Sections: FC<SectionProps> = ({ name, layout }) => {
    const { skuYPiezasTotales } = useAppSelector((state) => state.dashboard);
    const [camisetasYTops, setCamisetasYTops] = useState<SkuType[]>([]);
    const [camisasYBlusas, setCamisasYBlusas] = useState<SkuType[]>([]);
    const [faldasYShorts, setFaldasYShorts] = useState<SkuType[]>([]);
    const [vestidosYMonos, setVestidosYMonos] = useState<SkuType[]>([]);

    const sections: sectionsObject = {
        camisetasTops: camisetasYTops,
        camisasBlusas: camisasYBlusas,
        faldasShorts: faldasYShorts,
        vestidosMonos: vestidosYMonos,
        all: skuYPiezasTotales,
    };

    const loadCategories = () => {
        setCamisetasYTops(getCategory(1, 10));
        setCamisasYBlusas(getCategory(11, 2));
        setFaldasYShorts(getCategory(12, 3));
        setVestidosYMonos(getCategory(15, 7));
    };

    const getCategory = (id1, id2) => {
        const filteredCategory = skuYPiezasTotales.filter(
            (category) =>
                category.CategoryID === id1 || category.CategoryID === id2
        );

        return filteredCategory;
    };

    useEffect(() => {
        if (skuYPiezasTotales.length > 0) {
            loadCategories();
        }
    }, [skuYPiezasTotales]);

    return <BarChartGraph data={sections[name]} layout={layout} />;
};

export { Sections };
