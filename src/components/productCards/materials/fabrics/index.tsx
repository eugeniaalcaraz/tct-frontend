import React, { ChangeEvent, useState, useRef, useEffect, FC } from "react";
import { v4 as uuid } from "uuid";
import {
    ControlledDropdown,
    ControlledInput,
    Dropdown,
    Input,
} from "@components/common";
import {
    Button,
    Box,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { FabricContainer } from "../MaterialsStyles";
import { useAppSelector, useAppDispatch } from "@/state/app/hooks";
import { FabricOptionType } from "@/types";
import { handleCombos, removeCombo } from "@/state/features/product";
import { Controller } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";

type FabricProps = {
    fabricNumber: number;
};

const Fabrics: FC<FabricProps> = ({ fabricNumber }) => {
    const {
        fabrics,
        composition,
        localization,
        colors,
        combos1,
        combos2,
        combos3,
        combos4,
        combos5,
        errors,
    } = useAppSelector((state) => state.product);
    const [open, setOpen] = useState<boolean>(false);
    const [existingQuality, setExistingQuality] = useState<boolean>(true);
    const [selectedQuality, setSelectedQuality] = useState<string>("");
    const [compOfSelectedQuality, setCompOfSelectedQuality] = useState<
        { Description: string; Percentage: number }[]
    >([]);
    const [qualities, setQualities] = useState([0]);
    const [option, setOption] = useState("solido");
    const [printName, setPrintName] = useState<string>("");
    const [colorAmount, setColorAmount] = useState<number>();
    const [solidColorName, setSolidColorName] = useState<number[]>([]);
    const dispatch = useAppDispatch();
    const currentFabricNumber = fabricNumber + 1;
    const qualitiesWrapper = useRef<HTMLElement>(null);
    const existingQualityWrapper = useRef<HTMLElement>(null);

    const openOptions = () => {
        setOpen((prevState) => !prevState);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOption((event.target as HTMLInputElement).value);
    };

    const handleSelectedQuality = (e) => {
        setCompOfSelectedQuality([]);
        const selectedFabric = fabrics?.filter(
            ({ IdFabric }) => String(IdFabric) === e.target.value
        );
        if (selectedFabric) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSelectedQuality(String(selectedFabric[0]?.Weight));

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setCompOfSelectedQuality(selectedFabric[0]?.Composition);
        }
    };

    const handleQualityDisabled = (e) => {
        const qualitiesCopy = qualities;
        const value = Number(e.target.value);
        const position = Number(e.target.id) + 1;
        const valueInPosition =
            qualities.length > 1 ? qualities[position] : qualities[e.target.id];

        const percentages = qualities.reduce(
            (partialSum, a) => partialSum + a,
            0
        );

        if (value === valueInPosition && qualities.length > 1) {
            return;
        }

        if (value === 0) {
            if (qualities.length > 1) {
                qualitiesWrapper.current!.style.maxHeight = `${
                    5.5 * (qualities.length - 1)
                }rem`;
                const indexOfMatch = qualities.lastIndexOf(value);
                qualitiesCopy.splice(indexOfMatch + 1, 1);

                setTimeout(
                    () => indexOfMatch && setQualities(qualitiesCopy),

                    800
                );
                return;
            } else {
                return;
            }
        }
        if (percentages + value < 100) {
            if (position < qualities.length) {
                qualitiesCopy.splice(position, 1, value);
                setQualities(qualitiesCopy);
            } else {
                setQualities((prevState) => [...prevState, value]);
                qualitiesWrapper.current!.style.maxHeight = `${
                    6 * (qualities.length + 1)
                }rem`;
            }
        }
    };

    const adjustQualityWrapperHeight = () => {
        if (existingQualityWrapper.current) {
            existingQualityWrapper.current.style.maxHeight = `${
                6 * (qualities.length + 2)
            }rem`;
        }
    };

    const addCombo = () => {
        console.log({ option, colorAmount });

        if (
            (option === "solido" && solidColorName.length > 0) ||
            (option !== "solido" && colorAmount && printName !== "")
        ) {
            dispatch(
                handleCombos({
                    comboNumber: currentFabricNumber,
                    combo: {
                        fabric: option === "solido" ? "solid" : "printed",
                        colorAmount: option === "solido" ? 0 : colorAmount,
                        name:
                            option === "solido"
                                ? String(solidColorName[0])
                                : printName,
                        uuid: uuidv4(),
                    },
                })
            );
            setTimeout(() => {
                setOpen(false);
            }, 500);
            setColorAmount(undefined);
            setPrintName("");
            setSolidColorName([]);
        }
    };

    const comboReturner = (comboNumber: number) => {
        switch (comboNumber) {
            case 1:
                return combos1;
            case 2:
                return combos2;
            case 3:
                return combos3;
            case 4:
                return combos4;
            case 5:
                return combos5;
            default:
                return combos1;
        }
    };

    const deleteCombo = (uuid: string) => {
        if (comboReturner(currentFabricNumber).length) {
            dispatch(removeCombo({ comboNumber: currentFabricNumber, uuid }));
        }
    };

    const handleDescriptionBlur = (e) => {
        console.log(e.target.value);
        checkIfError("", true);
    };

    const checkIfError = (name, error = false) => {
        if (error) return true;
        if (name.endsWith(String(qualities.length - 1), 0)) {
            return false;
        }

        if (errors) {
            return Object.keys(errors).includes(name);
        }
        return false;
    };

    const checkErrorMessage = (name) => {
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
        adjustQualityWrapperHeight();
    }, [existingQualityWrapper, errors]);

    return (
        <>
            <FormControl className="radios">
                <Controller
                    rules={{ required: true }}
                    name={`existingQuality${currentFabricNumber}`}
                    render={({ field: { onChange, ...restField } }) => (
                        <RadioGroup
                            row
                            onChange={(event) => {
                                onChange(event);
                                setExistingQuality((prevState) => !prevState);
                            }}
                            {...restField}
                        >
                            <FormControlLabel
                                value={true}
                                control={<Radio />}
                                label="Usar calidad existente"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio />}
                                label="Calidad nueva"
                            />
                        </RadioGroup>
                    )}
                />
            </FormControl>
            <FabricContainer>
                {existingQuality ? (
                    <>
                        <ControlledDropdown
                            label="calidad *"
                            options={
                                fabrics?.map(
                                    ({
                                        IdFabric,
                                        Description,
                                        Weight,
                                        Composition,
                                    }): FabricOptionType => ({
                                        Id: String(IdFabric),
                                        Description,
                                        Weight,
                                        Composition,
                                    })
                                ) ?? []
                            }
                            name="calidad"
                            error={checkIfError("calidad")}
                            helperText={checkErrorMessage("calidad")}
                            onBlur={handleSelectedQuality}
                        />
                        {selectedQuality !== "" && (
                            <Box
                                className={`weight ${
                                    selectedQuality !== ""
                                        ? "selectedQuality"
                                        : ""
                                }`}
                            >
                                {selectedQuality && (
                                    <Input
                                        label="peso (gr)"
                                        value={
                                            selectedQuality ??
                                            "No hay registros"
                                        }
                                        disabled
                                    />
                                )}
                            </Box>
                        )}

                        <Box
                            ref={existingQualityWrapper}
                            className={`existingQualities ${
                                selectedQuality !== "" ? "selectedQuality" : ""
                            }
                               ${
                                   checkIfError("description") ||
                                   checkIfError("peso")
                                       ? "error"
                                       : ""
                               }
                            }`}
                        >
                            {compOfSelectedQuality &&
                                compOfSelectedQuality?.length > 0 &&
                                compOfSelectedQuality?.map(
                                    ({ Description, Percentage }) => (
                                        <Box key={uuid()}>
                                            <Input
                                                label="composición"
                                                value={Description}
                                                disabled
                                            />
                                            <Input
                                                label="porcentaje"
                                                value={String(Percentage)}
                                                disabled
                                            />
                                        </Box>
                                    )
                                )}
                        </Box>
                    </>
                ) : (
                    <>
                        <Box
                            className={`newQuality ${
                                checkIfError("description") ||
                                checkIfError("peso")
                                    ? "error"
                                    : ""
                            }`}
                        >
                            <ControlledInput
                                label="Nombre *"
                                name="fabricDescription"
                                error={checkIfError("fabricDescription")}
                                helperText={checkErrorMessage(
                                    "fabricDescription"
                                )}
                                onBlur={handleDescriptionBlur}
                            />
                            <ControlledInput
                                label="peso (gr) *"
                                name="peso"
                                error={checkIfError("peso")}
                                helperText={checkErrorMessage("peso")}
                            />
                        </Box>

                        <Box
                            ref={qualitiesWrapper}
                            className="qualities"
                            sx={{ transition: "all 0.8s ease" }}
                        >
                            {qualities.map((quality, i) => (
                                <Box key={i}>
                                    <ControlledDropdown
                                        label="composición *"
                                        options={composition ?? []}
                                        name={`composicion-${i}`}
                                        error={checkIfError(`composicion-${i}`)}
                                        helperText={checkErrorMessage(
                                            `composicion-${i}`
                                        )}
                                    />
                                    <ControlledInput
                                        label="porcentaje *"
                                        name={`porcentaje-${i}`}
                                        id={i}
                                        onBlur={handleQualityDisabled}
                                        error={checkIfError(`porcentaje-${i}`)}
                                        helperText={checkErrorMessage(
                                            `porcentaje-${i}`
                                        )}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </>
                )}

                <ControlledDropdown
                    label="Localización en la prenda"
                    options={localization ?? []}
                    name="localizacion"
                />
                <ControlledInput label="Consumo" name={"consumoCalidad"} />
                <Button
                    variant="text"
                    type="button"
                    color="primary"
                    onClick={openOptions}
                >
                    + COMBO
                </Button>
                <Box className={`comboBox ${open && "open"} ${option}`}>
                    <Box className={"radioContainer"}>
                        <FormControl className="radios">
                            <RadioGroup
                                row
                                name="controlled-radio-buttons-group"
                                value={option}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="solido"
                                    control={<Radio />}
                                    label="Sólido"
                                />
                                <FormControlLabel
                                    value="estampado"
                                    control={<Radio />}
                                    label="Estampado"
                                />
                            </RadioGroup>
                        </FormControl>

                        {option === "solido" ? (
                            <div className="dropdownSolid">
                                <Dropdown
                                    label="Color"
                                    options={colors ?? []}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    value={solidColorName}
                                    onChange={(e) => setSolidColorName(e)}
                                />
                            </div>
                        ) : (
                            <Box className="inputWrapper">
                                <Input
                                    label="Nombre de Estampa"
                                    value={printName}
                                    onInput={(e) =>
                                        setPrintName(e.target.value)
                                    }
                                />
                                <Input
                                    label="Cantidad de colores"
                                    value={
                                        colorAmount ? String(colorAmount) : ""
                                    }
                                    onInput={(e) =>
                                        setColorAmount(e.target.value)
                                    }
                                />
                            </Box>
                        )}
                        <Button
                            variant="text"
                            type="button"
                            color="primary"
                            onClick={addCombo}
                        >
                            + Agregar
                        </Button>
                    </Box>
                </Box>

                {comboReturner(currentFabricNumber) &&
                    comboReturner(currentFabricNumber).length > 0 && (
                        <Box className="combos">
                            {comboReturner(currentFabricNumber)?.map(
                                ({ fabric, uuid }, i) => (
                                    <Box key={uuid} className="combo">
                                        <div className="upper-container">
                                            Combo {i + 1}
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() =>
                                                    deleteCombo(uuid)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                        <Box className={fabric}></Box>
                                    </Box>
                                )
                            )}
                        </Box>
                    )}
            </FabricContainer>
        </>
    );
};

export { Fabrics };
