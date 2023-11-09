import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { FilterButton, ActionsButtons } from "./HeaderStyles";

import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { handleInputChange, toggleFilters } from "@/state/features/supplierFilters";
import {
    getCodeById,
    getCodeByName,
    getSeasonById,
    handleInputNumber,
} from "@/utils";
import { setFilterData } from "@/state/features/product";
import { useIconsContext } from "@components/hooks";
import { ProductHeaders } from "@/types";
import { exportToExcel } from "@/utils";
import dayjs from "dayjs";

const SuppliersHeader = () => {
    const { data } = useAppSelector(
        (state) => state.supplier
    );
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
        seasons,
    } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const { icons } = useIconsContext();

    const { alias } = useAppSelector(
        (state) => state.filtersSupplier
    );

    const handleChange = (e) => {
        dispatch(handleInputChange({
            label: "alias",
            value: e.target.value
        }))
    };


    const headerValues = Object.entries(ProductHeaders);

    headerValues.shift();

    const headers = headerValues.map(([, value]) => value);

    const rowHeaders = headers.map((header) => ({
        header,
        key: header,
        width: 14,
    }));
    const rows: unknown[] = [];

    const handleDownload = async () => {
        let data;

        data.forEach((supplier) => {
            const row = {};
            
            row["Id"] = supplier.id;
            row["Clasificación"] = supplier.performance;
            row["Alias"] = supplier.alias
            row["Tipo de proveedor"] = supplier.supplierType;
            row["Nombre comercial"] = supplier.commercialName;
            row["País"] = supplier.country;
            row["País riesgoso"] = supplier.riskyCountry;

            row["Persona de contacto"] = supplier.contactPerson;
            row["Email de contacto"] = supplier.contactEmail;
            row["Cant. Empleados"] = supplier.totalEmployees;
            // row["Cant. Empleados Hombres"] = supplier;
            // row["Cant. Empleados Mujeres"] = supplier;

            rows.push(row);
        });
        exportToExcel(rowHeaders, rows);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "calc(100% - 6rem)",
            }}
        >
            <TextField
                placeholder="Busca por alias"
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
                value={alias}
                onChange={handleChange}
            />
            <ActionsButtons>
                <FilterButton
                    variant="outlined"
                    type={"button"}
                    color="primary"
                    style={{ minWidth: "fit-content" }}
                    onClick={handleDownload}
                >
                    {icons["download"]}
                </FilterButton>
                <FilterButton
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={() => dispatch(toggleFilters())}
                >
                    {icons["filter"]} Filtros
                </FilterButton>
            </ActionsButtons>
        </Box>
    );
};

export default SuppliersHeader;
