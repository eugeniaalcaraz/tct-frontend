import React, { FC, useEffect, useMemo, useState } from "react";
import { Button, Box, Tooltip } from "@mui/material";
import { Container } from "./MaterialsStyles";
import { Fabrics } from "./fabrics";
import { Trims } from "./trims";
import { ControlledDropdown } from "@components/common";
import { ShoesFabric } from "../shoesFabric";
import { getMerchantShoeMaterialDropdownValue } from "@/services/ProductRequests";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { OptionsType } from "@/types";
import { changeAviosLength, changeTelasLength } from "@/state/features/product";

type MaterialsProps = {
    isShoe: boolean;
};

const Materials: FC<MaterialsProps> = ({ isShoe }) => {
    const [numberOfFabricsSelected, setNumberOfFabricsSelected] = useState(1);
    const [numberOfTrimsSelected, setNumberOfTrimsSelected] = useState(1);
    const { idMerchant } = useAppSelector((state) => state.user);
    const { telas, avios } = useAppSelector((state) => state.product);

    const [shoesOptions, setShoesOptions] = useState<OptionsType[]>([]);
    const dispatch = useAppDispatch();

    const fabricsArrOptions = useMemo(
        () =>
            Array.from(Array(Number(5)).keys()).map((value) => ({
                Id: String(value + 1),
                Description: value + 1,
            })),
        []
    );

    const trimsArrOptions = useMemo(
        () =>
            Array.from(Array(Number(11)).keys()).map((value) => ({
                Id: String(value),
                Description: value,
            })),
        []
    );

    const onSelectNumberOfFabrics = (e) => {
        const selectedNumberOfFabrics = Number(e.value);
        setNumberOfFabricsSelected(selectedNumberOfFabrics);
        if (telas.length > selectedNumberOfFabrics) {
            dispatch(changeTelasLength(selectedNumberOfFabrics));
        }
    };

    const onSelectNumberOfTrims = (e) => {
        const selectedNumberOfTrims = Number(e.value);
        setNumberOfTrimsSelected(selectedNumberOfTrims);
        if (avios.length > selectedNumberOfTrims) {
            dispatch(changeAviosLength(selectedNumberOfTrims));
        }
    };

    const {
        mutateAsync: getMerchantShoeMaterialsAsync,
        isLoading: merchantShoeMaterialsIsLoading,
        isError: merchantshoeMaterialError,
    } = useMutation(getMerchantShoeMaterialDropdownValue);

    const getShoeMaterials = async () => {
        const response = await getMerchantShoeMaterialsAsync({ idMerchant });
        return response;
    };

    useEffect(() => {
        getShoeMaterials().then((response) => {
            setShoesOptions(response);
        });
    }, []);

    return (
        <Container>
            {isShoe ? (
                <ControlledDropdown
                    label="Material"
                    options={shoesOptions}
                    name="idShoeMaterial"
                />
            ) : (
                <ControlledDropdown
                    label="Cantidad de telas"
                    options={fabricsArrOptions}
                    name="cantidadDeTelas"
                    externalOnChange={onSelectNumberOfFabrics}
                />
            )}
            <h3 className="calidad">Calidad</h3>
            {isShoe ? (
                <ShoesFabric />
            ) : (
                [...Array(numberOfFabricsSelected).keys()].map((value) => (
                    <Fabrics key={value} fabricNumber={value} />
                ))
            )}

            <ControlledDropdown
                label="Cuantos avíos tiene tu prenda?"
                options={trimsArrOptions}
                name="cantidadDeAvios"
                externalOnChange={onSelectNumberOfTrims}
            />

            {[...Array(numberOfTrimsSelected).keys()].map((value) => (
                <Trims key={value} trimNumber={value} />
            ))}
        </Container>
    );
};

export { Materials };
