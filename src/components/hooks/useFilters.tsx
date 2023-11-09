import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { useMemo } from "react";

export const useFilters = () => {
    const dispatch = useAppDispatch();

    const getFunction = (filter, id, category) => {
        switch (filter) {
            case "temporada":
                return category.find((option) => option.IdSeason === Number(id))
                    ?.SeasonName;

            case "proveedor":
                return category.find((option) => option.Id === Number(id))
                    ?.Name;

            case "departamento":
                return category.find((option) => option.Id === id)?.Description;

            case "tipologia":
                return category.find((option) => option.Id === id)?.Description;

            case "calidad":
                return category.find((option) => option.IdFabric === Number(id))
                    ?.Description;

            case "estado":
                return category.find((option) => option.IdStatus === Number(id))
                    ?.Description;

            case "diseñador": {
                const name = category.find(
                    (option) => option.Id === Number(id)
                )?.Name;

                const lastname = category.find(
                    (option) => option.Id === Number(id)
                )?.LastName;

                return `${name} ${lastname}`;
            }
            case "origin":
                return category.find((option) => option.Id === Number(id))
                    ?.Name;

            case "destino":
                return category.find((option) => option.Id === Number(id))
                    ?.Name;

            case "embarque":
                return category.find((option) => option.Id === id)?.Description;

            case "cantidad":
                return `${filter}`;

            case "costo":
                return `$ ${filter}`;

            case "peso":
                return `${filter}gr`;

            default:
                return filter;
        }
    };

    const filterActions = useMemo(
        () => ({
            getFilterDescription(filter, id = null, category) {
                return getFunction(filter, id, category);
            },
        }),
        [dispatch]
    );

    return filterActions;
};
