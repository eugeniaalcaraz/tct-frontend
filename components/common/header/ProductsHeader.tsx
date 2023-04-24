import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { FilterButton } from "./HeaderStyles";

import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { toggleFilters } from "@/state/features";
import { handleInputNumber } from "@/utils";
import { setFilterData } from "@/state/features/product";
import { useIconsContext } from "@components/hooks";

const ProductsHeader = () => {
    const { product } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const { icons } = useIconsContext();

    const handleChange = (e) => {
        filterByValue(e.target.value);
    };

    const filterByValue = async (query: string) => {
        if (query === "") {
            dispatch(setFilterData([]));
        } else {
            if (product) {
                const filteredData = product.filter((p) =>
                    Object.keys(p).some(() =>
                        String(p["IdProduct"]).includes(query)
                    )
                );
                dispatch(setFilterData(filteredData));
            }
        }
    };

    return (
        <>
            <TextField
                placeholder="Busca tu orden"
                id="outlined-start-adornment"
                sx={{
                    width: "30rem",
                    height: "3.5rem",
                    "& > *": { height: "100%" },
                    "& > div > input": { fontSize: "1.4rem" },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {icons["search"]}
                        </InputAdornment>
                    ),
                }}
                onKeyDown={(e) => handleInputNumber(e)}
                onChange={handleChange}
            />
            <FilterButton
                variant="contained"
                type="submit"
                color="primary"
                onClick={() => dispatch(toggleFilters())}
            >
                {icons["filter"]} Filtros
            </FilterButton>
        </>
    );
};

export default ProductsHeader;
