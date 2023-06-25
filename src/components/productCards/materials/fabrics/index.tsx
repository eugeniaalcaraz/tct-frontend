import React, {
    ChangeEvent,
    useState,
    useRef,
    useEffect,
    FC,
    useMemo,
} from "react";
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
import {
    ColorCombo,
    FabricCombo,
    FabricComboMaterial,
    FabricOptionType,
    OptionsType,
    PrintCombo,
} from "@/types";
import { addTela, removeCombo } from "@/state/features/product";
import { Controller } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { SyledTextField } from "@components/common/textInput/StyledTextField";
import dayjs, { OptionType } from "dayjs";

type FabricProps = {
    fabricNumber: number;
    title?: string;
};

const Fabrics: FC<FabricProps> = ({ fabricNumber, title }) => {
    const { fabrics, composition, localization, colors, telas, errors } =
        useAppSelector((state) => state.product);
    const [open, setOpen] = useState<boolean>(false);
    const [existingQuality, setExistingQuality] = useState<boolean>(true);
    const [selectedQuality, setSelectedQuality] = useState<string>("");
    const [compOfSelectedQuality, setCompOfSelectedQuality] = useState<
        { Description: string; Percentage: number }[]
    >([]);
    const [qualities, setQualities] = useState([0]);
    const [option, setOption] = useState("solido");
    const [printName, setPrintName] = useState<string>("");
    const [colorAmount, setColorAmount] = useState<number>(0);
    const [solidColorName, setSolidColorName] = useState<number>(0);
    const dispatch = useAppDispatch();
    const currentFabricNumber = fabricNumber + 1;
    const qualitiesWrapper = useRef<HTMLElement>(null);
    const existingQualityWrapper = useRef<HTMLElement>(null);
    const compositionSelect = useState(0);
    const [localColorList, setlocalColorList] = useState<OptionsType[]>([]);
    const [consumption, setConsumption] = useState("");
    const telasUpdatableObject = useMemo(
        () => ({ ...telas[fabricNumber] }),
        [telas]
    );

    const [finalComboObject, setFinalComboObject] =
        useState<FabricComboMaterial>({
            idFabric: "",
            description: "",
            consumption: 0,
            weight: 0,
            placement: 0,
            composition: [],
            colors: [],
            prints: [],
        });

    const openOptions = () => {
        setOpen((prevState) => !prevState);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOption((event.target as HTMLInputElement).value);
    };

    const handleSelectedQuality = (e) => {
        setCompOfSelectedQuality([]);
        const selectedFabric = fabrics?.find(
            ({ IdFabric }) => String(IdFabric) === e.value
        );
        if (selectedFabric) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSelectedQuality(String(selectedFabric?.Weight));

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setCompOfSelectedQuality(selectedFabric?.Composition);

            //TODO: revisar tema de composition, el tipo no es el mismo
            setFinalComboObject((prevState) => ({
                ...prevState,
                weight: Number(selectedFabric.Weight),
                idFabric: e.value,
                description: selectedFabric.Description,
                composition: selectedFabric.Composition.map(
                    ({ Description, Percentage }) => ({
                        idFiber: 0,
                        percentage: Percentage,
                        descripcion: Description,
                    })
                ),
            }));
        }
    };

    const restorePrintData = () => {
        // setPrintName("");
        // setColorAmount(0);
    };

    const setLocalComboArray = () => {
        if (option === "solido" && solidColorName !== 0) {
            const tempSolidColorObj: ColorCombo = {
                idColor: solidColorName,
                sizeCurve: [],
            };

            setlocalColorList((prevState) =>
                prevState.filter((color) => Number(color.Id) !== solidColorName)
            );

            setFinalComboObject((prevState) => ({
                ...prevState,
                colors: [...finalComboObject.colors, tempSolidColorObj],
            }));
            return;
        }

        //setting printObjetct on array

        if (printName !== "" && colorAmount !== 0) {
            const tempLocalPrintObject: PrintCombo = {
                nombre: printName,
                cantidadColor: colorAmount,
                sizeCurve: [],
            };

            setFinalComboObject((prevState) => ({
                ...prevState,
                prints: [...prevState.prints, tempLocalPrintObject],
            }));
        }
    };

    const handleCompositionSelect = (e) => {
        if (e.target.value !== "") {
            const composition = {
                idFiber: e.target.value,
                percentage: 0,
            };
            const compositionCopy = [...finalComboObject.composition];

            compositionCopy.push(composition);

            setFinalComboObject((prevState) => ({
                ...prevState,
                idFabric: "0",
                composition: compositionCopy,
            }));
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
        if (percentages + value <= 100) {
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

    const deleteCombo = (id: number) => {
        setFinalComboObject((prevState) => ({
            ...prevState,
            colors: prevState.colors.filter((color) => color.idColor !== id),
        }));
    };

    const handleDescriptionBlur = (e) => {
        setFinalComboObject((prevState) => ({
            ...prevState,
            description: e.target.value,
        }));
        checkIfError("", true);
    };

    const handleWeightBlur = (e) => {
        setFinalComboObject((prevState) => ({
            ...prevState,
            weight: e.target.value,
        }));
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

    useEffect(() => {
        if (colors?.length) {
            setlocalColorList([...colors]);
        }
    }, [colors]);

    useEffect(() => {
        if (open) {
            setOpen(false);
            setColorAmount(0);
            setPrintName("");
            setSolidColorName(0);
            setOption("solido");
            // dispatch(addTela({ fabricNumber, tela: finalComboObject }));
        }
        dispatch(
            addTela({
                fabricNumber,
                tela: {
                    ...finalComboObject,
                    entryDate:
                        telasUpdatableObject.entryDate ??
                        dayjs().add(15, "day").format("YYYY-DD-MM"),
                    shippingDate:
                        telasUpdatableObject.shippingDate ??
                        dayjs().add(15, "day").format("YYYY-DD-MM"),
                    warehouseEntryDate:
                        telasUpdatableObject.warehouseEntryDate ??
                        dayjs().add(15, "day").format("YYYY-DD-MM"),
                    idCountryDestination:
                        telasUpdatableObject.idCountryDestination ?? 0,
                    idShipping: telasUpdatableObject.idShipping ?? 0,
                },
            })
        );
    }, [finalComboObject]);

    useEffect(() => {
        setFinalComboObject((prevState) => ({
            ...prevState,
            composition: prevState.composition.map((fiber, index) => ({
                ...fiber,
                percentage: qualities[index + 1],
            })),
        }));
    }, [qualities]);

    useEffect(() => {
        setFinalComboObject((prevState) => ({
            ...prevState,
            weight: 0,
            description: "",
            composition: [],
            idFabric: "",
        }));
        setCompOfSelectedQuality([]);
        setSelectedQuality("");
    }, [existingQuality]);

    return (
        <>
            {title && <h2>{title}</h2>}
            <FormControl className="radios">
                <RadioGroup
                    row
                    onChange={(event) => {
                        // onChange(event);
                        setExistingQuality((prevState) => !prevState);
                    }}
                    value={existingQuality}
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
            </FormControl>
            <FabricContainer>
                {existingQuality ? (
                    <>
                        <ControlledDropdown
                            label="calidad *"
                            useFormHook={false}
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
                            externalOnChange={handleSelectedQuality}
                            selectedValue={finalComboObject.idFabric}
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
                                name="nombreNuevoFabric"
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
                                onBlur={handleWeightBlur}
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
                                        onBlur={handleCompositionSelect}
                                    />
                                    <ControlledInput
                                        label="porcentaje *"
                                        name={`porcentaje-${i}`}
                                        disabled={
                                            !finalComboObject.composition[i]
                                        }
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
                    useFormHook={false}
                    selectedValue={finalComboObject.placement}
                    name="localizacion"
                    externalOnChange={(e) =>
                        setFinalComboObject((prevObject) => ({
                            ...prevObject,
                            placement: e.value,
                        }))
                    }
                />
                <ControlledInput
                    label="Consumo"
                    useFormhook={false}
                    externalValue={consumption}
                    name={`consumoCalidad${currentFabricNumber}`}
                    externalOnChange={(e) => setConsumption(e.target.value)}
                    onBlur={() =>
                        setFinalComboObject((prevObject) => ({
                            ...prevObject,
                            consumption: Number(consumption),
                        }))
                    }
                />
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
                                    options={localColorList}
                                    multipleSelect={false}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    value={solidColorName}
                                    onChange={(e) => {
                                        setSolidColorName(e);
                                    }}
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
                                    value={String(colorAmount)}
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
                            onClick={() => setLocalComboArray()}
                        >
                            + Agregar
                        </Button>
                    </Box>
                </Box>

                {!!telas[fabricNumber]?.colors.length && (
                    <Box className="combos">
                        {telas[fabricNumber].colors.map((selectedColor, i) => (
                            <Box key={selectedColor.idColor} className="combo">
                                <div className="upper-container">
                                    Combo {i + 1}
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                            deleteCombo(selectedColor.idColor)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                                <Box
                                    sx={{
                                        backgroundColor: `${
                                            colors?.find(
                                                (color) =>
                                                    Number(color.Id) ===
                                                    selectedColor.idColor
                                            )?.RGB
                                        }`,
                                    }}
                                ></Box>
                            </Box>
                        ))}
                    </Box>
                )}
                {!!telas[fabricNumber]?.prints.length && (
                    <Box className="combos">
                        {telas[fabricNumber].prints.map((selectedPrint, i) => (
                            <Box key={i} className="combo">
                                <div className="upper-container">
                                    Estampado {i + 1}
                                    <IconButton
                                        aria-label="delete"
                                        // onClick={() =>
                                        //     deleteCombo(uuid)
                                        // }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                                <Box className={"printed"}></Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </FabricContainer>
        </>
    );
};

export { Fabrics };
