import React, { FC, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Modal } from ".";
import { ModalTypes } from "@/types";
import { Button, MenuItem, Select, TextField, InputLabel } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { useModal } from "@components/hooks";
import {
    setNewFabricColor,
    setNewFabricPrint,
    setNewTrimColor,
} from "@/state/features/updatedProduct";

type NewComboProps = {
    parentIndex: number;
};

const NewCombo: FC<NewComboProps> = ({ parentIndex }) => {
    const { colors } = useAppSelector((state) => state.product);
    const { curve } = useAppSelector((state) => state.updatedProduct);
    const { modalType } = useAppSelector((state) => state.modal);
    const [color, setColor] = useState("");
    const [print, setPrint] = useState({ name: "", colorAmount: "" });
    const { closeModal } = useModal();
    const dispatch = useAppDispatch();

    const handleSave = () => {
        if (modalType === ModalTypes.NewFabricColor) {
            const newColor = { idColor: color, sizeCurve: curve, idStatus: 5 };
            dispatch(setNewFabricColor({ parentIndex, color: newColor }));
        } else if (modalType === ModalTypes.NewFabricPrint) {
            const { name, colorAmount } = print;
            const newPrint = {
                nombre: name,
                cantidadColor: String(colorAmount),
                sizeCurve: curve,
                idStatus: 5,
            };
            dispatch(setNewFabricPrint({ parentIndex, print: newPrint }));
        } else if (modalType === ModalTypes.NewTrimColor) {
            const newColor = { idColor: color, idStatus: 5 };
            dispatch(setNewTrimColor({ parentIndex, color: newColor }));
        }
        closeModal();
    };

    useEffect(() => {
        return () => {
            setColor("");
            setPrint({ name: "", colorAmount: "" });
        };
    }, []);

    return (
        <>
            {parentIndex !== -1 && (
                <Modal
                    header={
                        modalType === ModalTypes.NewFabricColor
                            ? "Nuevo color de tela"
                            : modalType === ModalTypes.NewFabricPrint
                            ? "Nueva estampa"
                            : modalType === ModalTypes.NewTrimColor
                            ? "Nuevo color de avío"
                            : ""
                    }
                    content={
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                gap: "5rem",
                            }}
                        >
                            {modalType === ModalTypes.NewFabricColor ||
                            modalType === ModalTypes.NewTrimColor ? (
                                <div style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-label">
                                        Color:
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        size="small"
                                        sx={{
                                            width: "100%",
                                        }}
                                        value={color}
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                    >
                                        {colors?.map((option) => (
                                            <MenuItem
                                                key={uuid()}
                                                value={option?.Id}
                                            >
                                                {option?.Description}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            ) : modalType === ModalTypes.NewFabricPrint ? (
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <TextField
                                        label="Nombre estampa:"
                                        onBlur={(e) =>
                                            setPrint({
                                                ...print,
                                                name: e.target.value,
                                            })
                                        }
                                        size="small"
                                        sx={{
                                            width: "48%",
                                        }}
                                    />
                                    <TextField
                                        label="Cantidad de colores:"
                                        onBlur={(e) =>
                                            setPrint({
                                                ...print,
                                                colorAmount: e.target.value,
                                            })
                                        }
                                        type="number"
                                        size="small"
                                        sx={{
                                            width: "48%",
                                        }}
                                    />{" "}
                                </div>
                            ) : (
                                <></>
                            )}
                            <Button
                                variant="contained"
                                type="button"
                                color="secondary"
                                onClick={handleSave}
                                sx={{ width: "fit-content" }}
                                disabled={
                                    modalType === ModalTypes.NewFabricColor ||
                                    modalType === ModalTypes.NewTrimColor
                                        ? color === ""
                                        : modalType ===
                                          ModalTypes.NewFabricPrint
                                        ? print.name === "" ||
                                          print.colorAmount === ""
                                        : false
                                }
                            >
                                Guardar
                            </Button>
                        </div>
                    }
                    loading={false}
                ></Modal>
            )}
        </>
    );
};

export default NewCombo;
