import React from "react";
import { Navigate } from "react-router-dom";
import { urlFormat, getCurrentUser } from "@/utils";
import { Layout } from "@/layout";
import { Pages } from "@/types";
import { useAppDispatch } from "@/state/app/hooks";
import { setIdMerchant } from "@/state/features/user";

const PrivateRoute = () => {
    const dispatch = useAppDispatch();
    const user = getCurrentUser();
    if (user) {
        dispatch(setIdMerchant(getCurrentUser().idMerchant));
    }

    return user ? <Layout /> : <Navigate to={urlFormat(Pages.Login)} />;
};

export { PrivateRoute };
