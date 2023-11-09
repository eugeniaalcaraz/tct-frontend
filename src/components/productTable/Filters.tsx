import React from "react";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "@/state/app/hooks";
import { Date, Dropdown, Input } from "@/components/common";

import { FiltersContainer } from "./TableStyles";
import { OptionsType } from "@/types";

const inputFilters = ["nombre"];

const Filters = () => {
    const filters = useAppSelector((state) => state.filters);
    const {
        allSeasons,
        supplier,
        managementUnit,
        tipology,
        fabrics,
        brands,
        industries,
        concepts,
        lines,
        bodyFit,
    } = useAppSelector((state) => state.product);

    const dropdownFilters = [
        {
            name: "temporada",
            options: allSeasons?.map(
                ({ IdSeason, SeasonName }): OptionsType => ({
                    Id: String(IdSeason),
                    Description: SeasonName,
                })
            ),
        },
        {
            name: "proveedor",
            options: supplier?.map(
                ({ Id, Name, Lastname }): OptionsType => ({
                    Id: String(Id),
                    Description: `${Name} ${Lastname}`,
                })
            ),
        },
        {
            name: "marca",
            options: brands?.map(
                ({ Id, Name }): OptionsType => ({
                    Id: String(Id),
                    Description: Name,
                })
            ),
        },
        { name: "unidad", options: managementUnit },
        { name: "rubro", options: industries },
        { name: "tipologia", options: tipology },
        { name: "concepto", options: concepts },
        { name: "linea", options: lines },
        { name: "fit", options: bodyFit },
        {
            name: "calidad",
            options: fabrics?.map(
                ({ IdFabric, Description }): OptionsType => ({
                    Id: String(IdFabric),
                    Description,
                })
            ),
        },
    ];

    return (
        <FiltersContainer className={filters.open ? "open" : "closed"}>
            {inputFilters.map((filter) => {
                return (
                    <Input
                        key={filter}
                        label={filter}
                        value={filters[filter]}
                    />
                );
            })}
            {dropdownFilters.map(({ name, options }) => {
                return (
                    <Dropdown
                        key={uuid()}
                        label={name}
                        options={options ?? []}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        value={filters[name]}
                    />
                );
            })}
            <Date label="Fecha Embarque" type="fecha" />
            <Date label="Ingreso Depósito" type="deposito" />
            <Date label="Ingreso Tienda" type="store" />
        </FiltersContainer>
    );
};

export default Filters;
