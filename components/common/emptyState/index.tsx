import React, { FC } from "react";
import { Typography } from "@mui/material";
import styles from "./EmptyState.module.css";
import { Link } from "react-router-dom";
import { urlFormat } from "@/utils";
import { Pages } from "@/types";

type EmptyStateProps = {
    search?: boolean;
};

const EmptyState: FC<EmptyStateProps> = ({ search = false }) => {
    return (
        <div className={styles.container}>
            {search ? (
                <>
                    <div className={styles.loader} />
                    <div className={styles.text}>
                        <Typography variant="body2">
                            Parece que no hay coincidencias con tu búsqueda,
                        </Typography>
                        <Typography variant="body2">
                            puedes volver a intentarlo con otra combinación de
                            filtros.
                        </Typography>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.empty} />
                    <div className={styles.text}>
                        <Typography variant="body2">
                            Aún no hay data ingresada.
                        </Typography>
                        <Typography variant="body2">
                            Puedes agregar nuevos productos{" "}
                            <Link to={urlFormat(Pages.NewProduct)}>aquí</Link>
                        </Typography>
                    </div>
                </>
            )}
        </div>
    );
};

export { EmptyState };
