import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { Date, Dropdown, Input } from "@/components/common";

import { FiltersContainer } from "./TableStyles";
import { OptionsType } from "@/types";
import { CalificationsSupplier } from "./Row";
import { FormStructureContext } from "@/pages/newSupplier/FormContext";
import { handleSelectChange } from "@/state/features/supplierFilters";

const inputFilters = ["nombre"];


const Filters = () => {
    const filters = useAppSelector((state) => state.filtersSupplier);

    const dispatch = useAppDispatch();
    const formContext = useContext(FormStructureContext)

    const dropdownFilters = [
        {
            name: "score",
            options: CalificationsSupplier?.map(
                ({ name }): OptionsType => ({
                    Id: name,
                    Description: name,
                })
            ),
        },
        {
            name: "origin",
            options: formContext?.countries?.map(
                ({ Id, Name }): OptionsType => ({
                    Id: String(Id),
                    Description: `${Name}`,
                })
            ),
        },
        {
            name: "tipo",
            options: formContext?.supplierTypes.map(
                ({ id, description }): OptionsType => ({
                    Id: String(id),
                    Description: description,
                })
            ),
        },
        {
            name: "producto",
            options: formContext?.supplierProductTypes.map(
                ({ id, description }): OptionsType => ({
                    Id: String(id),
                    Description: description,
                })
            ),
        }
    ];
    

    const handleFilterChange = (e, state) => {
        let value = e.target.value;
        dispatch(handleSelectChange({
            label: state,
            value:
                typeof value === "string" ? value.split(",") : value,
        }));
    }

    return (
        <FiltersContainer className={filters.open ? "open" : "closed"}>
            
            {dropdownFilters.map(({ name, options }) => {
                return (
                    <Dropdown
                        key={uuid()}
                        label={name}
                        options={options ?? []}
                        value={filters[name] ?? []}
                        variant="supplierFilters"
                    />
                );
            })}
        </FiltersContainer>
    );
};

export default Filters;
