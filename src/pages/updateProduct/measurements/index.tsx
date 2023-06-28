import React from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "@/state/app/hooks";
import { useIconsContext } from "@components/hooks";
import StateOptions from "../stateLabel/StateOptions";

const Measurements = () => {
    const { edition } = useAppSelector((state) => state.product);
    const { icons } = useIconsContext();
    return (
        <section>
            <h3 style={{ marginBottom: "1.5rem" }}>TABLA DE MEDIDAS</h3>
            <StateOptions status={"aprobado"} />
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
                        <input
                            type="file"
                            hidden
                            // onChange={handlePreview}
                        />
                    </Button>
                ) : (
                    <>Table</>
                )}
            </div>
        </section>
    );
};

export { Measurements };
