import React from "react";
import { useAppSelector } from "@/state/app/hooks";
import { ControlledDropdown, ControlledInput } from "@components/common";
import { Container } from "./ProductStyles";

const ProductCard = () => {
    const { seasons, tipology, departments, designers, errors } =
        useAppSelector((state) => state.product);

    const dropdowns = [
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
            label: "tipologia *",
            name: "tipologia",
            options: tipology ?? [],
        },

        {
            label: "departamento",
            name: "departamento",
            options: departments ?? [],
        },
        {
            label: "diseñador",
            name: "diseñador",
            options:
                designers?.map((designer) => ({
                    Id: designer.Id,
                    Description: `${designer.Name} ${designer.LastName}`,
                })) ?? [],
        },
    ];

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

    return (
        <Container>
            {dropdowns.map(({ name, label, options }) => {
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
                    />
                );
            })}

            <ControlledInput
                label="Nombre del producto *"
                name="nombreDelProducto"
                error={checkIfError("nombreDelProducto")}
                helperText={checkErrorMessage("nombreDelProducto")}
            />

            <ControlledInput
                label="Descripción"
                multiline
                rows={4}
                name="descripcion"
                error={checkIfError("descripcion")}
                helperText={checkErrorMessage("descripcion")}
            />
        </Container>
    );
};

export { ProductCard };
