import React from "react";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";

import { ChipsWrapper } from "./TableStyles";
import { clearInputFilter, clearSelectFilter } from "@/state/features";
import { useFilters, useIconsContext } from "@components/hooks";

const FilterChips = () => {
    const filters = useAppSelector((state) => state.filters);
    const dispatch = useAppDispatch();
    const { getFilterDescription } = useFilters();
    const { icons } = useIconsContext();

    const removeMultipleSelectFilter = (filter, option) => {
        dispatch(clearSelectFilter({ label: filter, value: option }));
    };

    const removeInputFilter = (filter) => {
        dispatch(clearInputFilter(filter));
    };

    const getDescription = (filter) => {
        return getFilterDescription(
            filter[0],
            filter[1][0],
            filters[filter[0]]
        );
    };

    return (
        <ChipsWrapper>
            {Object.entries(filters).map((filter) =>
                typeof filter[1] === "string" && filter[1] !== "" ? (
                    <span key={uuid()}>
                        {getDescription(filter)}
                        <span onClick={() => removeInputFilter(filter[0])}>
                            {icons["close"]}
                        </span>
                    </span>
                ) : (
                    filter[1].length > 0 &&
                    filter[1].map((option) => (
                        <span key={uuid()}>
                            {getDescription(filter)}
                            <span
                                onClick={() =>
                                    removeMultipleSelectFilter(
                                        filter[0],
                                        option
                                    )
                                }
                            >
                                {icons["close"]}
                            </span>
                        </span>
                    ))
                )
            )}
        </ChipsWrapper>
    );
};

export default FilterChips;
