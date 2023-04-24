import React, { useCallback, useEffect } from "react";
import styles from "./Error.module.css";
import { Button } from "@mui/material";
import ServerError from "@/assets/images/error500.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { useMutation } from "@tanstack/react-query";
import { handleProductData } from "@/state/features/product";
import { urlFormat } from "@/utils";
import { Pages } from "@/types";
import { getListingFilters } from "@/services/ProductRequests";

const ServerDown = () => {
    return (
        <div className={styles.container}>
            <img
                src={ServerError}
                alt="Server Error Message"
                className={styles.serverError}
            />
            <Link to={"/"}>
                <Button variant="outlined">Refresh</Button>
            </Link>
        </div>
    );
};

export { ServerDown };
