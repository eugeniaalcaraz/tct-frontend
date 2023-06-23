import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useAppSelector } from "@/state/app/hooks";
import { ControlledDropdown, ControlledInput } from "@components/common";
import { Container } from "./ProductStyles";
import { ControlledCheckbox } from "@components/common/form/controlledCheckbox";

import dayjs from "dayjs";
import _ from "lodash";
import { productReducer, initialProductState } from "./hooks/hooks";
import { SyledTextField } from "@components/common/textInput/StyledTextField";
import { Description } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import {
    getMerchantIndustryDropdownValue,
    getMerchantTypologyDropdownValue,
} from "@/services/ProductRequests";
import { OptionsType } from "@/types";

const ProductCard = () => {
    const {
        seasons,
        brands,
        concepts,
        lines,
        rises,
        bodyFit,
        managementUnit,
        designers,
        errors,
    } = useAppSelector((state) => state.product);
    const { idMerchant } = useAppSelector((state) => state.user);

    //IdMarca/Temporada/Año/IdTipologia/NroDeProducto(3 cifras).
    const [state, dispatch] = useReducer(productReducer, initialProductState);
    const [rubros, setRubros] = useState<OptionsType[]>([
        { Id: "", Description: "" },
    ]);
    const [tipology, setTipology] = useState<OptionsType[]>([
        { Id: "", Description: "" },
    ]);
    const [selectedHeading, setSelectedHeading] = useState("");

    const yearsDropdownArr = useMemo(() => {
        const currentYear = Number(dayjs().format("YY"));
        return _.range(currentYear, currentYear + 4);
    }, []);

    const {
        mutateAsync: getMerchantIndustryAsync,
        isLoading: merchantIndustryIsLoading,
        isError: merchantIndustryError,
    } = useMutation(getMerchantIndustryDropdownValue);

    const {
        mutateAsync: getMerchantTipologyAsync,
        isLoading: merchantIsTipologyLoading,
        isError: merchantTipologyError,
    } = useMutation(getMerchantTypologyDropdownValue);

    //getMerchantTypologyDropdownValue

    const generalPropsDropdowns = useMemo(
        () => [
            {
                label: "marca *",
                name: "idMerchantBrand",
                options:
                    brands?.map((brand) => ({
                        Id: brand.Id,
                        Description: brand.Name,
                    })) ?? [],
            },
            {
                label: "temporada *",
                name: "idSeason",
                options:
                    seasons?.map((season) => ({
                        Id: season.Id,
                        Description: season.Name,
                    })) ?? [],
            },
            {
                label: "Año *",
                name: "year",
                options:
                    yearsDropdownArr?.map((year) => ({
                        Id: year,
                        Description: year,
                    })) ?? [],
            },
            {
                label: "unidad de gestion",
                name: "idDepartment",
                options: managementUnit ?? [],
            },
            {
                label: "rubro *",
                name: "idIndustry",
                options: rubros,
            },
            {
                label: "tipologia *",
                name: "idTipology",
                options: tipology ?? [],
            },
        ],
        [seasons, tipology, managementUnit, rubros, yearsDropdownArr]
    );

    const specificPropsDropdowns = useMemo(
        () => [
            {
                label: "Concepto",
                name: "idConcept",
                options: concepts ?? [],
                disable: false,
            },
            {
                label: "Línea",
                name: "idLine",
                options: lines ?? [],
                disable: false,
            },
            {
                label: "Body Fit",
                name: "idBodyFit",
                options: bodyFit ?? [],
                disable: false,
            },
            {
                label: "Tiro (Exclusivo Jean)",
                name: "idRise",
                options: rises ?? [],
                disable:
                    state.selectedTipology !==
                    tipology.find((tipo) =>
                        (tipo.Description as string).includes("Jean")
                    )?.Id,
            },
        ],
        [concepts, lines, bodyFit, rises, state.selectedTipology]
    );

    const checkIfError = (name) => {
        if (errors) {
            return Object.keys(errors).includes(name);
        }
        return false;
    };

    const checkErrorMessage = (name) => {
        if (name.startsWith("composicion", 0)) {
            name = "composicion";
        }
        if (name.startsWith("porcentaje", 0)) {
            name = "porcentaje";
        }
        if (errors) {
            const errorMessage =
                Object.entries(errors).filter((error) => {
                    if (error[0] === name) {
                        return error[1];
                    }
                }) ?? "";

            if (errorMessage && errorMessage.length > 0) {
                return errorMessage[0][1].message;
            }
        }
        return "";
    };

    const dropdownOnSelect = (e) => {
        console.log({ name: e.name });

        if (e.name === "rubro") {
            setSelectedHeading(
                String(
                    rubros.find((element) => element.Id === e.value)
                        ?.Description
                ) ?? ""
            );
        }
        if (e.name === "idMerchantBrand") {
            dispatch({ type: "setSelectedBrand", payload: e.value });
        }
        if (e.name === "idSeason") {
            dispatch({ type: "setSelectedSeason", payload: e.value });
        }
        if (e.name === "year") {
            dispatch({ type: "setSelectedYear", payload: e.value });
        }
        if (e.name === "idTipology") {
            dispatch({ type: "setSelectedTipology", payload: e.value });
        }
        if (e.name === "idDepartment") {
            dispatch({ type: "setSelectedManagementUnit", payload: e.value });
        }
        if (e.name === "idIndustry") {
            dispatch({ type: "setSelectedIndustry", payload: e.value });
        }
    };

    const shouldEnableHeading = () => state.selectedIndustry !== 3;

    const getIndustriesDropdownValue = async () => {
        const response = await getMerchantIndustryAsync({
            idManagementUnit: state.selectedManagementUnit,
            idMerchant,
        });

        return response;
    };

    const getTipologyDropdownValue = async () => {
        const response = await getMerchantTipologyAsync({
            idIndustry: state.selectedIndustry,
        });

        return response;
    };

    useEffect(() => {
        if (state.selectedManagementUnit !== "") {
            getIndustriesDropdownValue().then((response) =>
                setRubros(response)
            );
        }
    }, [state.selectedManagementUnit]);

    useEffect(() => {
        if (state.selectedIndustry !== "") {
            getTipologyDropdownValue().then((response) =>
                setTipology(response)
            );
        }
    }, [state.selectedIndustry]);

    return (
        <Container>
            {generalPropsDropdowns.map(({ name, label, options }) => {
                return (
                    <ControlledDropdown
                        key={name}
                        label={label}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        options={options}
                        name={name}
                        error={checkIfError(name)}
                        helperText={checkErrorMessage(name)}
                        externalOnChange={dropdownOnSelect}
                    />
                );
            })}
            <div className="readOnlyContainer">
                <SyledTextField
                    label="Peso"
                    name="peso"
                    disabled={true}
                    value={"test"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </div>
            {specificPropsDropdowns.map(({ name, label, options, disable }) => {
                return (
                    <ControlledDropdown
                        key={name}
                        label={label}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        options={options}
                        name={name}
                        error={checkIfError(name)}
                        disabled={disable}
                        helperText={checkErrorMessage(name)}
                    />
                );
            })}
            <div>
                <ControlledInput
                    label="Nombre del producto *"
                    name="nombre"
                    error={checkIfError("nombreDelProducto")}
                    helperText={checkErrorMessage("nombreDelProducto")}
                />
            </div>

            <div>
                <ControlledInput
                    label="Numero"
                    useFormhook={false}
                    name="numero"
                    disabled={true}
                    readOnly={true}
                    externalValue={"test Numero"}
                    externalOnChange={(e) =>
                        dispatch({
                            type: "setSelectedProductNumber",
                            payload: e,
                        })
                    }
                />
            </div>

            <ControlledInput
                label="Descripción"
                multiline
                rows={4}
                name="detail"
                error={checkIfError("descripcion")}
                helperText={checkErrorMessage("descripcion")}
            />
            <div>
                <ControlledCheckbox name="proyecta" label="Proyecta" />
            </div>
            <div style={{ width: "100%" }}>
                <h2>Código Rotunda</h2>
                <h1>{state.finalNumber}</h1>
                {
                    //IdMarca/Temporada/Año/IdTipologia/NroDeProducto(3 cifras).
                }
            </div>
        </Container>
    );
};

export { ProductCard };
