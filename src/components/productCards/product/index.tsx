import React, { FC, useEffect, useMemo, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { ControlledDropdown, ControlledInput } from "@components/common";
import { Container } from "./ProductStyles";
import { ControlledCheckbox } from "@components/common/form/controlledCheckbox";

import dayjs from "dayjs";
import _ from "lodash";
import { productReducer, initialProductState } from "./hooks/hooks";

import { useMutation } from "@tanstack/react-query";
import {
    getMerchantIndustryDropdownValue,
    getMerchantTypologyDropdownValue,
} from "@/services/ProductRequests";
import { OptionsType, TipologyOptions } from "@/types";
import { changeTelasLength, handleProductData } from "@/state/features/product";
import { getCodeById } from "@/utils";

type ProductCardType = {
    setSelectedTipology: any;
};

const ProductCard: FC<ProductCardType> = ({ setSelectedTipology }) => {
    const {
        seasons,
        brands,
        concepts,
        lines,
        rises,
        bodyFit,
        managementUnit,
        errors,
        mutationSuccess,
        tipology: tipologiesByIndustry,
    } = useAppSelector((state) => state.product);
    const { idMerchant } = useAppSelector((state) => state.user);
    const reduxDispatch = useAppDispatch();

    //IdMarca/Temporada/Año/IdTipologia/NroDeProducto(3 cifras).
    const [state, dispatch] = useReducer(productReducer, initialProductState);
    const [rubros, setRubros] = useState<OptionsType[]>([
        { Id: "", Description: "" },
    ]);
    const [tipology, setTipology] = useState<TipologyOptions[]>([
        { Id: "", Description: "", Code: "", Weight: "" },
    ]);

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

    const idShoes = useMemo(
        () =>
            tipology.find(
                (tipology) =>
                    (tipology.Description as string).includes("Shoes") ?? 0
            ),
        [tipology]
    );

    const weightValue = useMemo(() => {
        if (mutationSuccess) {
            return "";
        } else {
            return tipology.find(
                (tipology) => tipology.Id === state.selectedTipology
            )?.Weight;
        }
    }, [state.selectedTipology, mutationSuccess]);

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
            // {
            //     label: "Año *",
            //     name: "year",
            //     options:
            //         yearsDropdownArr?.map((year) => ({
            //             Id: year,
            //             Description: year,
            //         })) ?? [],
            // },
            {
                label: "unidad de gestion",
                name: "idManagmentUnit",
                options: managementUnit ?? [],
            },
            {
                label: "rubro *",
                name: "idIndustry",
                options: rubros,
                disabled: rubros.length === 0,
            },
            {
                label: "tipologia *",
                name: "idTipology",
                options: tipology,
                disabled: tipology.length === 0,
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
                    )?.Code,
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
        //TODO get CODE by id
        if (e.name === "idMerchantBrand") {
            dispatch({
                type: "setSelectedBrand",
                payload: getCodeById(e.value, brands),
            });

            // dispatch({ type: "setSelectedYear", payload: 1 });
        }
        if (e.name === "idSeason") {
            dispatch({
                type: "setSelectedSeason",
                payload: getCodeById(e.value, seasons),
            });
        }
        // if (e.name === "year") {
        //     dispatch({ type: "setSelectedYear", payload: getCodeById(e.value, ) });
        // }
        if (e.name === "idTipology") {
            setSelectedTipology(getCodeById(e.value, tipologiesByIndustry));
            dispatch({
                type: "setSelectedTipology",
                payload: getCodeById(e.value, tipologiesByIndustry),
            });
            if (e.value !== idShoes) {
                reduxDispatch(changeTelasLength(1));
            }
        }
        if (e.name === "idManagmentUnit") {
            dispatch({
                type: "setSelectedManagementUnit",
                payload: e.value,
            });
        }
        if (e.name === "idIndustry") {
            dispatch({
                type: "setSelectedIndustry",
                payload: e.value,
            });
        }
    };

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
            getTipologyDropdownValue().then((tipology) => {
                setTipology(tipology);
                reduxDispatch(handleProductData({ tipology }));
            });
        }
    }, [state.selectedIndustry]);

    useEffect(() => {
        if (mutationSuccess) {
            dispatch({ type: "resetStates" });
        }
    }, [mutationSuccess]);

    return (
        <Container>
            {generalPropsDropdowns.map(({ name, label, options, disabled }) => {
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
                        disabled={disabled}
                    />
                );
            })}
            <div className="readOnlyContainer">
                <ControlledInput
                    label="Peso"
                    name="peso"
                    useFormhook={false}
                    disabled={true}
                    externalValue={weightValue}
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
                    name="nombreDelProducto"
                    error={checkIfError("nombreDelProducto")}
                    helperText={checkErrorMessage("nombreDelProducto")}
                />
            </div>

            {/* <div>
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
            </div> */}

            <ControlledInput
                label="Descripción"
                multiline
                rows={4}
                name="detail"
                id="detail"
                error={checkIfError("descripcion")}
                helperText={checkErrorMessage("descripcion")}
            />
            <div>
                <ControlledCheckbox name="proyecta" label="Proyecta" />
            </div>
            <div style={{ width: "100%" }}>
                <h2>Código Rotundo</h2>
                <h1>{state.finalNumber}</h1>
                {
                    //IdMarca/Temporada/Año/IdTipologia/NroDeProducto(3 cifras).
                }
            </div>
        </Container>
    );
};

export { ProductCard };
