import React from "react";

import { useAppSelector } from "@/state/app/hooks";
import { Date, Dropdown, Input } from "@/components/common";

import { FiltersContainer } from "./TableStyles";
import { OptionsType } from "@/types";

const inputFilters = ["nombre", "cantidad", "costo", "peso"];

const Filters = () => {
    const filters = useAppSelector((state) => state.filters);
    const {
        allSeasons,
        supplier,
        departments,
        tipology,
        fabrics,
        designers,
        countries,
        status,
        typeOfshipment,
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
        { name: "departamento", options: departments },
        { name: "tipologia", options: tipology },
        {
            name: "calidad",
            options: fabrics?.map(
                ({ IdFabric, Description }): OptionsType => ({
                    Id: String(IdFabric),
                    Description,
                })
            ),
        },
        {
            name: "estado",
            options: status?.map(
                ({ IdStatus, Description }): OptionsType => ({
                    Id: String(IdStatus),
                    Description,
                })
            ),
        },
        {
            name: "diseñador",
            options: designers?.map(
                ({ Id, Name, LastName }): OptionsType => ({
                    Id: String(Id),
                    Description: `${Name} ${LastName}`,
                })
            ),
        },
        {
            name: "origen",
            options: countries?.map(
                ({ Id, Name }): OptionsType => ({
                    Id: String(Id),
                    Description: Name,
                })
            ),
        },
        {
            name: "destino",
            options: countries?.map(
                ({ Id, Name }): OptionsType => ({
                    Id: String(Id),
                    Description: Name,
                })
            ),
        },
        {
            name: "embarque",
            options: typeOfshipment,
        },
    ];

    return (
        <FiltersContainer className={filters.open ? "open" : "closed"}>
            {dropdownFilters.map(({ name, options }) => {
                return (
                    <Dropdown
                        key={name}
                        label={name}
                        options={options ?? []}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        value={filters[name]}
                    />
                );
            })}
            <Date label="Fecha" />
            {inputFilters.map((filter) => {
                return (
                    <Input
                        key={filter}
                        label={filter}
                        value={filters[filter]}
                    />
                );
            })}
        </FiltersContainer>
    );
};

export default Filters;
