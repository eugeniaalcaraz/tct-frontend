import React, { useState } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { useIconsContext } from "@components/hooks";
import StateOptions from "../stateLabel/StateOptions";
import { getStatus } from "@/utils";
import { setMmtTable } from "@/state/features/updatedProduct";

const Measurements = () => {
    const [table, setTable] = useState("");
    const { edition } = useAppSelector((state) => state.product);
    const updateData = useAppSelector((state) => state.updatedProduct);
    const { idModelingStatus } = useAppSelector(
        (state) => state.updatedProduct
    );
    const { icons } = useIconsContext();
    const dispatch = useAppDispatch();

    const handleMmt = async (e) => {
        let attachments: DataTransfer = new DataTransfer();

        if (e.dataTransfer) {
            attachments = e.dataTransfer.files;
        } else if (e.target) {
            attachments = e.target.files;
        }
        const filesSelected = [];
        for (let i = 0; i < Object.keys(attachments).length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            filesSelected.push(URL.createObjectURL(attachments[i]));
        }
        setTable(filesSelected[0]);
        dispatch(setMmtTable(filesSelected[0]));
    };

    return (
        <section>
            <h3 style={{ marginBottom: "1.5rem" }}>TABLA DE MEDIDAS</h3>
            <StateOptions
                status={getStatus(Number(idModelingStatus))}
                id={{ index: 0, item: "measurements" }}
            />
            <div
                className="item"
                style={{
                    backgroundColor: "#DAD9D9",
                    maxWidth: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1.5rem",
                    height: "40rem",
                }}
            >
                {edition ? (
                    <Button
                        variant="outlined"
                        component="label"
                        className="files"
                    >
                        <span style={{ marginRight: "1rem" }}>Modificar</span>{" "}
                        {icons["upload"]}
                        <input type="file" hidden onChange={handleMmt} />
                    </Button>
                ) : (
                    <img
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                        }}
                        alt={`Tabla de medidas de producto ${updateData?.idProduct}`}
                        src={table}
                    />
                )}
            </div>
        </section>
    );
};

export { Measurements };
