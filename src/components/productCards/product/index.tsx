import React, { useMemo, useReducer, useState } from "react";
import { useAppSelector } from "@/state/app/hooks";
import { ControlledDropdown, ControlledInput } from "@components/common";
import { Container } from "./ProductStyles";
import { ControlledCheckbox } from "@components/common/form/controlledCheckbox";
import {
    brandsArr,
    rubro,
    concepto,
    tiro,
    bodyFit,
    linea,
} from "@assets/mockedData/mockedData";
import dayjs from "dayjs";
import _ from "lodash";
import { productReducer, initialProductState } from "./hooks/hooks";

const ProductCard = () => {
    const { seasons, tipology, managementUnit, designers, errors } =
        useAppSelector((state) => state.product);
    //IdMarca/Temporada/Año/IdTipologia/NroDeProducto(3 cifras).
    const [state, dispatch] = useReducer(productReducer, initialProductState);

    const [selectedHeading, setSelectedHeading] = useState("");
    // const [selectedBrand, setSelectedBrand] = useState("");
    // const [selectedSeason, setSelectedSeason] = useState("");
    // const [selectedYear, setSelectedYear] = useState("");
    // const [selectedTypology, setSelectedTypology] = useState("");
    // const [selectedproductNumber, setSelectedproductNumber] = useState("");

    const yearsDropdownArr = useMemo(() => {
        const currentYear = Number(dayjs().format("YY"));
        return _.range(currentYear, currentYear + 4);
    }, []);

    const generalPropsDropdowns = useMemo(
        () => [
            {
                label: "marca *",
                name: "marca",
                options: brandsArr ?? [],
            },
            {
                label: "temporada *",
                name: "temporada",
                options:
                    seasons?.map((season) => ({
                        Id: season.Id,
                        Description: season.Name,
                    })) ?? [],
            },
            {
                label: "Año *",
                name: "año",
                options:
                    yearsDropdownArr?.map((year) => ({
                        Id: year,
                        Description: year,
                    })) ?? [],
            },
            {
                label: "unidad de gestion",
                name: "unidadDeGestion",
                options: managementUnit ?? [],
            },
            {
                label: "rubro *",
                name: "rubro",
                options:
                    rubro?.map((season) => ({
                        Id: season.Id,
                        Description: season.Name,
                    })) ?? [],
            },
            {
                label: "tipologia *",
                name: "tipologia",
                options: tipology ?? [],
            },
        ],
        [seasons, tipology, managementUnit]
    );

    const specificPropsDropdowns = useMemo(
        () => [
            {
                label: "Concepto",
                name: "concepto",
                options: concepto ?? [],
            },
            {
                label: "Línea",
                name: "linea",
                options: linea ?? [],
            },
            {
                label: "Body Fit",
                name: "bodyFit",
                options: bodyFit ?? [],
            },
            {
                label: "Tiro (Exclusivo Jean)",
                name: "tiro",
                options: tiro ?? [],
            },
        ],
        [concepto, linea, bodyFit, tiro]
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
        if (e.name === "rubro") {
            setSelectedHeading(
                rubro.find((element) => element.id === e.value) ?? ""
            );
        }
        if (e.name === "marca") {
            dispatch({ type: "setSelectedBrand", payload: e.value });
        }
        if (e.name === "temporada") {
            dispatch({ type: "setSelectedSeason", payload: e.value });
        }
        if (e.name === "año") {
            dispatch({ type: "setSelectedYear", payload: e.value });
        }
        if (e.name === "tipologia") {
            dispatch({ type: "setSelectedTypology", payload: e.value });
        }
    };

    const shouldEnableHeading = () => selectedHeading !== "Jean";

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
            <div>
                <ControlledInput
                    label="Peso"
                    name="peso"
                    disabled={true}
                    defaultValue={"test"}
                    readOnly={true}
                />
            </div>
            {specificPropsDropdowns.map(({ name, label, options }) => {
                return (
                    <ControlledDropdown
                        key={name}
                        label={label}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        options={options}
                        name={name}
                        error={checkIfError(name)}
                        disabled={
                            name === "tiro" ? shouldEnableHeading() : false
                        }
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

            <div>
                <ControlledInput
                    label="Numero"
                    name="numero"
                    disabled={true}
                    defaultValue={"test Numero"}
                    readOnly={true}
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
                name="descripcion"
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
