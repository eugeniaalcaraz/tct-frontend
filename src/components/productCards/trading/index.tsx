import React, { useEffect, useState } from "react";
import { ControlledInput } from "@components/common";
import { Container } from "./TradingStyles";
import Switch from "@mui/material/Switch";
import { useAppSelector } from "@/state/app/hooks";

const Trading = () => {
    const { errors } = useAppSelector((state) => state.product);

    const [buying, setBuying] = useState<number>(0);
    const [selling, setSelling] = useState<number>(0);
    const [margin, setMargin] = useState<number>(0);
    const [pvpChecked, setPvpChecked] = useState(false);

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
        if (selling !== 0 && buying !== 0) {
            setMargin(((selling / 1.22 - buying) / (selling / 1.22)) * 100);
        } else {
            setMargin(0);
        }
    }, [buying, selling]);

    return (
        <Container
            className={
                checkIfError("costo") || checkIfError("precioVenta")
                    ? "error"
                    : ""
            }
        >
            <div className="toggle-container">
                <span>Margen</span>
                <Switch
                    checked={pvpChecked}
                    onChange={() => setPvpChecked(!pvpChecked)}
                />
                <span>PVP</span>
            </div>
            <ControlledInput
                label="Costo(USD)"
                name="costo"
                onBlur={(e) => setBuying(Number(e.target.value))}
                error={checkIfError("costo")}
                helperText={checkErrorMessage("costo")}
            />
            {pvpChecked ? (
                <ControlledInput
                    label="Margen"
                    name="margen"
                    onBlur={(e) => setMargin(Number(e.target.value))}
                    error={checkIfError("precioVenta")}
                    helperText={checkErrorMessage("precioVenta")}
                />
            ) : (
                <ControlledInput
                    label="Venta(USD)"
                    name="precioVenta"
                    onBlur={(e) => setSelling(Number(e.target.value))}
                    error={checkIfError("precioVenta")}
                    helperText={checkErrorMessage("precioVenta")}
                />
            )}
            {pvpChecked ? (
                <div className="pvp-container">
                    <h2>{"PVP(USD):"}</h2>
                    <h2>{"Precio Tienda:"}</h2>
                </div>
            ) : (
                <span className="margin">Margen % {margin.toFixed(2)}</span>
            )}
        </Container>
    );
};

export { Trading };
