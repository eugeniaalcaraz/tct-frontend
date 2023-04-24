import React, { useEffect, useState } from "react";
import { ControlledInput } from "@components/common";
import { Container } from "./TradingStyles";
import { useAppSelector } from "@/state/app/hooks";

const Trading = () => {
    const { errors } = useAppSelector((state) => state.product);

    const [buying, setBuying] = useState<number>(0);
    const [selling, setSelling] = useState<number>(0);
    const [margin, setMargin] = useState<number>(0);

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

    useEffect(() => {
        setMargin(((selling / 1.22 - buying) / (selling / 1.22)) * 100);
    }, [buying, selling]);

    return (
        <Container
            className={
                checkIfError("costo") || checkIfError("precioVenta")
                    ? "error"
                    : ""
            }
        >
            <ControlledInput
                label="Costo"
                name="costo"
                onBlur={(e) => setBuying(Number(e.target.value))}
                error={checkIfError("costo")}
                helperText={checkErrorMessage("costo")}
            />
            <ControlledInput
                label="Precio Tienda"
                name="precioVenta"
                onBlur={(e) => setSelling(Number(e.target.value))}
                error={checkIfError("precioVenta")}
                helperText={checkErrorMessage("precioVenta")}
            />
            {margin > 0 && !isNaN(margin) && (
                <span className="margin">Margen % {margin.toFixed(2)}</span>
            )}
        </Container>
    );
};

export { Trading };
