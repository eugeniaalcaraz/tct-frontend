import React, { FC, useEffect, useState } from "react";
import { ControlledInput } from "@components/common";
import { Container } from "./TradingStyles";
import Switch from "@mui/material/Switch";
import { useAppSelector } from "@/state/app/hooks";

type TradingProps = {
    formMethods: any;
};

const Trading: FC<TradingProps> = ({ formMethods }) => {
    const { errors } = useAppSelector((state) => state.product);

    const [buying, setBuying] = useState<number>(0);
    const [selling, setSelling] = useState<number>(0);
    const [finalPrice, setFinalPrice] = useState<number>(0);
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
        if (!pvpChecked) {
            if (selling !== 0 && buying !== 0) {
                setMargin(((selling / 1.22 - buying) / (selling / 1.22)) * 100);
            } else {
                setMargin(0);
            }
        }
    }, [buying, selling]);

    useEffect(() => {
        if (pvpChecked) {
            setSelling(buying + buying * (margin / 100));
        }
    }, [margin, buying]);

    useEffect(() => {
        setFinalPrice(selling * 40);
    }, [selling]);

    useEffect(() => {
        setSelling(0);

        setBuying(0);
        setFinalPrice(0);
        setMargin(0);
        // formMethods.reset({ margin: "", cost: "", precioVenta: "" });
    }, [pvpChecked]);

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
                name="cost"
                onBlur={(e) => setBuying(Number(e.target.value))}
                error={checkIfError("costo")}
                helperText={checkErrorMessage("costo")}
            />
            {pvpChecked ? (
                <ControlledInput
                    label="Margen"
                    name="margin"
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

            <div className="pvp-container">
                {pvpChecked ? (
                    <span>{`PVP(USD): ${selling.toFixed(2)}`}</span>
                ) : (
                    <span>Margen % {margin.toFixed(2)}</span>
                )}
                <span>{`Precio Tienda: ${finalPrice.toFixed(2)}`}</span>
            </div>
        </Container>
    );
};

export { Trading };
