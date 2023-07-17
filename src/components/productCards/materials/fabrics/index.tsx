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
    FabricComboMaterial,
    FabricOptionType,
    OptionsType,
    PrintCombo,
} from "@/types";
import {
    addTela,
    clearErrors,
    clearReduxErrors,
    removeReduxError,
    setReduxErrors,
} from "@/state/features/product";
import { Controller, useFormContext } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { SyledTextField } from "@components/common/textInput/StyledTextField";
import dayjs, { OptionType } from "dayjs";
import {
    checkErrorMessage,
    checkIfError,
} from "@/pages/newProduct/aux/errorValidation";

type FabricProps = {
    fabricNumber: number;
    title?: string;
    // setIsMaterialExisting: any;
};

const Fabrics: FC<FabricProps> = ({
    fabricNumber,
    title,
    // setIsMaterialExisting,
}) => {
    const {
        fabrics,
        composition,
        localization,
        colors,
        telas,
        errors,
        reduxErrors,
        mutationSuccess,
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
    const [colorAmount, setColorAmount] = useState<number>(0);
    const [solidColorName, setSolidColorName] = useState<number>(0);
    const dispatch = useAppDispatch();
    const currentFabricNumber = fabricNumber + 1;
    const qualitiesWrapper = useRef<HTMLElement>(null);
    const existingQualityWrapper = useRef<HTMLElement>(null);
    const compositionSelect = useState(0);
    const [localColorList, setlocalColorList] = useState<OptionsType[]>([]);
    const [consumption, setConsumption] = useState("");
    const [errorComposition, setErrorComposition] = useState(false);
    const telasUpdatableObject = useMemo(
        () => ({ ...telas[fabricNumber] }),
        [telas]
    );
    const {
        formState: { isSubmitting },
    } = useFormContext();

    const [finalComboObject, setFinalComboObject] =
        useState<FabricComboMaterial>({
            idFabric: "",
            idStatus: 5,
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

    const setLocalComboArray = () => {
        dispatch(removeReduxError(`fabricCombo-${fabricNumber}`));

        if (option === "solido" && solidColorName !== 0) {
            const tempSolidColorObj: ColorCombo = {
                idColor: solidColorName,
                sizeCurve: [],
                idStatus: 5,
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
                idStatus: 5,
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
        const qualitiesCopy = [...qualities];
        const value = Number(e.target.value);
        qualitiesCopy[e.target.id] = value;
        setErrorComposition(false);

        const percentages = qualitiesCopy.reduce(
            (partialSum, a) => partialSum + a,
            0
        );

        if (value === 0) {
            return;
        }
        if (percentages < 100) {
            qualitiesWrapper.current!.style.maxHeight = `${
                5 * qualitiesCopy.length
            }rem`;
            setQualities(qualitiesCopy);
        } else if (percentages === 100) {
            setQualities(qualitiesCopy);
        } else if (percentages > 100) {
            setErrorComposition(true);
        }

        dispatch(removeReduxError(`composition-${fabricNumber}`));
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

    const deletePrintCombo = (printCombo: PrintCombo) => {
        setFinalComboObject((prevState) => ({
            ...prevState,
            prints: prevState.prints.filter(
                (print) => print.nombre !== printCombo.nombre
            ),
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
        if (/^[0-9.,\b]+$/.test(e.target.value)) {
            setFinalComboObject((prevState) => ({
                ...prevState,
                weight: e.target.value,
            }));
        } else {
            dispatch(
                setReduxErrors({
                    idError: `weight-${fabricNumber}`,
                    msg: "Solo Numeros",
                })
            );
        }
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
                        dayjs().add(15, "day").format("YYYY-MM-DD"),
                    shippingDate:
                        telasUpdatableObject.shippingDate ??
                        dayjs().add(15, "day").format("YYYY-MM-DD"),
                    warehouseEntryDate:
                        telasUpdatableObject.warehouseEntryDate ??
                        dayjs().add(15, "day").format("YYYY-MM-DD"),
                    idCountryDestination:
                        telasUpdatableObject.idCountryDestination ?? 0,
                    idShipping: telasUpdatableObject.idShipping ?? 0,
                    quantity: telasUpdatableObject.quantity ?? 0,
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
            placement: 0,
            consumption: 0,
            idFabric: "",
        }));
        setCompOfSelectedQuality([]);
        setSelectedQuality("");
        setConsumption("");
        setErrorComposition(false);

        if (reduxErrors && Object.keys(reduxErrors).length) {
            dispatch(clearReduxErrors());
        }
    }, [existingQuality]);

    useEffect(() => {
        if (isSubmitting) {
            if (finalComboObject.placement === 0) {
                dispatch(
                    setReduxErrors({
                        idError: `placement-${fabricNumber}`,
                        msg: "Requerido",
                    })
                );
            }
            if (finalComboObject.consumption === 0) {
                dispatch(
                    setReduxErrors({
                        idError: `consumoCalidad-${currentFabricNumber}`,
                        msg: "Requerido",
                    })
                );
            }
            if (
                !finalComboObject.colors.length &&
                !finalComboObject.prints.length
            ) {
                dispatch(
                    setReduxErrors({
                        idError: `fabricCombo-${fabricNumber}`,
                        msg: "Requerido",
                    })
                );
            }
            if (existingQuality) {
                if (selectedQuality === "") {
                    dispatch(
                        setReduxErrors({
                            idError: `calidad-${fabricNumber}`,
                            msg: "Requerido",
                        })
                    );
                }
                return;
            }
            if (finalComboObject.description === "") {
                dispatch(
                    setReduxErrors({
                        idError: `nombreNuevoFabric-${fabricNumber}`,
                        msg: "Requerido",
                    })
                );
            }
            if (finalComboObject.weight === 0) {
                dispatch(
                    setReduxErrors({
                        idError: `weight-${fabricNumber}`,
                        msg: "Requerido",
                    })
                );
            }
            if (
                !finalComboObject.composition.length ||
                qualities.reduce((curr, next) => curr + next, 0) === 0
            ) {
                dispatch(
                    setReduxErrors({
                        idError: `composition-${fabricNumber}`,
                        msg: "Requerido",
                    })
                );
            }
        }
    }, [isSubmitting]);

    useEffect(() => {
        if (mutationSuccess) {
            setFinalComboObject({
                idFabric: "",
                idStatus: 5,
                description: "",
                consumption: 0,
                weight: 0,
                placement: 0,
                composition: [],
                colors: [],
                prints: [],
            });
            setCompOfSelectedQuality([]);
            setSelectedQuality("");
        }
    }, [mutationSuccess]);

    return (
        <>
            {title && <h2>{title}</h2>}
            <FormControl className="radios">
                <RadioGroup
                    row
                    onChange={(event) => {
                        // onChange(event);
                        dispatch(clearErrors());

                        setExistingQuality((prevState) => !prevState);
                        // setIsMaterialExisting(existingQuality);
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
                            id={`calidad-${fabricNumber}`}
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
                            error={checkIfError(
                                `calidad-${fabricNumber}`,
                                reduxErrors
                            )}
                            helperText={checkErrorMessage(
                                `calidad-${fabricNumber}`,
                                reduxErrors
                            )}
                            externalOnChange={(e) => {
                                handleSelectedQuality(e);
                                if (e.value !== "") {
                                    dispatch(
                                        removeReduxError(
                                            `calidad-${fabricNumber}`
                                        )
                                    );
                                }
                            }}
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
                                   checkIfError(
                                       `calidad-${fabricNumber}`,
                                       reduxErrors
                                   )
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
                                checkIfError(
                                    `nombreNuevoFabric-${fabricNumber}`,
                                    reduxErrors
                                )
                                    ? "error"
                                    : ""
                            }`}
                        >
                            <ControlledInput
                                label="Nombre *"
                                name={`nombreNuevoFabric-${fabricNumber}`}
                                id={`nombreNuevoFabric-${fabricNumber}`}
                                error={checkIfError(
                                    `nombreNuevoFabric-${fabricNumber}`,
                                    reduxErrors
                                )}
                                helperText={checkErrorMessage(
                                    `nombreNuevoFabric-${fabricNumber}`,
                                    reduxErrors
                                )}
                                onBlur={(e) => {
                                    handleDescriptionBlur(e);
                                    if (e.target.value !== "") {
                                        dispatch(
                                            removeReduxError(
                                                `nombreNuevoFabric-${fabricNumber}`
                                            )
                                        );
                                    }
                                }}
                            />
                            <ControlledInput
                                label="peso (gr) *"
                                name={`weight-${fabricNumber}`}
                                id={`weight-${fabricNumber}`}
                                error={checkIfError(
                                    `weight-${fabricNumber}`,
                                    reduxErrors
                                )}
                                helperText={checkErrorMessage(
                                    `weight-${fabricNumber}`,
                                    reduxErrors
                                )}
                                onBlur={(e) => {
                                    handleWeightBlur(e);
                                    if (/^[0-9.,\b]+$/.test(e.target.value)) {
                                        dispatch(
                                            removeReduxError(
                                                `weight-${fabricNumber}`
                                            )
                                        );
                                    }
                                }}
                            />
                        </Box>

                        <Box
                            ref={qualitiesWrapper}
                            className="qualities"
                            sx={{ transition: "all 0.8s ease" }}
                        >
                            {qualities.map((quality, i) => (
                                // <Box key={uuid()}>
                                <Box key={i}>
                                    <ControlledDropdown
                                        label="composición *"
                                        id={`composicion-${fabricNumber}-${i}`}
                                        options={composition ?? []}
                                        name={`composicion-${fabricNumber}-${i}`}
                                        error={checkIfError(
                                            `composition-${fabricNumber}`,
                                            reduxErrors
                                        )}
                                        helperText={checkErrorMessage(
                                            `composition-${fabricNumber}`,
                                            reduxErrors
                                        )}
                                        onBlur={handleCompositionSelect}
                                    />
                                    <ControlledInput
                                        label={`Porcentaje *`}
                                        name={`porcentaje-${fabricNumber}-${i}`}
                                        disabled={
                                            !finalComboObject.composition[i]
                                        }
                                        id={i + 1}
                                        onBlur={(e) => {
                                            if (
                                                /^[0-9.,\b]+$/.test(
                                                    e.target.value
                                                )
                                            ) {
                                                dispatch(
                                                    removeReduxError(
                                                        `porcentaje-${fabricNumber}-${i}`
                                                    )
                                                );
                                                handleQualityDisabled(e);
                                            } else {
                                                dispatch(
                                                    setReduxErrors({
                                                        idError: `porcentaje-${fabricNumber}-${i}`,
                                                        msg: "Solo números",
                                                    })
                                                );
                                            }
                                        }}
                                        error={checkIfError(
                                            `porcentaje-${fabricNumber}-${i}`,
                                            reduxErrors
                                        )}
                                        helperText={checkErrorMessage(
                                            `porcentaje-${fabricNumber}-${i}`,
                                            reduxErrors
                                        )}
                                    />
                                </Box>
                            ))}
                        </Box>
                        {errorComposition && (
                            <span className="composition-error">
                                La suma de porcentajes no puede ser mayor a 100%
                            </span>
                        )}
                        {checkIfError(
                            `composition-${fabricNumber}`,
                            reduxErrors
                        ) && (
                            <span className="composition-error">
                                Campos requeridos
                            </span>
                        )}
                    </>
                )}

                <ControlledDropdown
                    label="Localización en la prenda"
                    options={localization ?? []}
                    // useFormHook={false}
                    // selectedValue={finalComboObject.placement}
                    name={`placement-${fabricNumber}`}
                    id={`placement-${fabricNumber}`}
                    error={checkIfError(
                        `placement-${fabricNumber}`,
                        reduxErrors
                    )}
                    helperText={checkErrorMessage(
                        `placement-${fabricNumber}`,
                        reduxErrors
                    )}
                    onBlur={(e) => {
                        setFinalComboObject((prevObject) => ({
                            ...prevObject,
                            placement: e.target.value,
                        }));
                        if (e.value !== "") {
                            dispatch(
                                removeReduxError(`placement-${fabricNumber}`)
                            );
                        }
                    }}
                />
                <ControlledInput
                    label="Consumo"
                    // useFormhook={false}
                    // externalValue={consumption}
                    name={`consumoCalidad-${currentFabricNumber}`}
                    id={`consumoCalidad-${currentFabricNumber}`}
                    error={checkIfError(
                        `consumoCalidad-${currentFabricNumber}`,
                        reduxErrors
                    )}
                    helperText={checkErrorMessage(
                        `consumoCalidad-${currentFabricNumber}`,
                        reduxErrors
                    )}
                    // externalOnChange={(e) => {
                    //     setConsumption(e.target.value);
                    // }}
                    onBlur={(e) => {
                        if (/^[0-9.,\b]+$/.test(e.target.value)) {
                            // setConsumption(e.target.value);
                            dispatch(
                                removeReduxError(
                                    `consumoCalidad-${currentFabricNumber}`
                                )
                            );

                            setFinalComboObject((prevObject) => ({
                                ...prevObject,
                                consumption: Number(e.target.value),
                            }));
                        } else {
                            dispatch(
                                setReduxErrors({
                                    idError: `consumoCalidad-${currentFabricNumber}`,
                                    msg: "Solo números",
                                })
                            );
                        }
                    }}
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
                {checkIfError(`fabricCombo-${fabricNumber}`, reduxErrors) && (
                    <span className="combo-error">
                        Es necesario ingresar al menos 1 combo
                    </span>
                )}

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
                            <Box key={i} className="combo combo-print">
                                <div className="upper-container">
                                    Estampado {i + 1}
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                            deletePrintCombo(selectedPrint)
                                        }
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
