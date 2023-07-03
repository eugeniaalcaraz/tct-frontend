import React from "react";
import { ThemeProvider, Theme } from "@mui/material/styles";
import "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Routes, Route } from "react-router-dom";
import {
    Login,
    Dashboard,
    ProductList,
    NewProduct,
    NotFound,
    ServerDown,
} from "@/pages";
import { PrivateRoute } from "@/routes/privateRoute";
import { Pages } from "@/types";
import { urlFormat } from "@/utils";

import { theme } from "./theme";

declare module "@mui/styles/defaultTheme" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

import Amplify from "aws-amplify";
import { IconsProvider } from "@components/hooks";
import { UpdateProduct } from "./pages/updateProduct";

Amplify.configure({
    Auth: {
        region: "us-east-1",
        userPoolId: "us-east-1_QA9zDgySb",
        userPoolWebClientId: "mrn4nbego27f03qt37o7n0rni",
        oauth: {
            domain: "the-circular-tech",
            scope: [
                "phone",
                "email",
                "profile",
                "openid",
                "aws.cognito.signin.user.admin",
            ],
            redirectSignIn: "http://localhost:5173/",
            redirectSignOut: "http://localhost:5173/",
            responseType: "code",
        },
    },
});
function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <IconsProvider>
                <Routes>
                    <Route path={urlFormat(Pages.Login)} element={<Login />} />
                    <Route path="/" element={<PrivateRoute />}>
                        <Route
                            path={urlFormat(Pages.Dashboard)}
                            element={<Dashboard />}
                        />
                        <Route
                            path={urlFormat(Pages.Products)}
                            element={<ProductList />}
                        />
                        <Route
                            path={urlFormat(Pages.NewProduct)}
                            element={<NewProduct />}
                        />
                        <Route
                            path={urlFormat(Pages.ServerError)}
                            element={<ServerDown />}
                        />
                        <Route
                            path={`${urlFormat(Pages.UpdateProduct)}/:id`}
                            element={<UpdateProduct />}
                        />
                    </Route>
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </IconsProvider>
        </ThemeProvider>
    );
}

export default App;
