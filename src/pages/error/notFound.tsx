import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import NotFount from "@/assets/images/error404.png";
import styles from "./Error.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <img
                src={NotFount}
                alt="Page Not Found Error Message"
                className={styles.error}
            />
            <Link to={"/"}>
                <Button variant="outlined">Volver</Button>
            </Link>
        </div>
    );
};

export { NotFound };
