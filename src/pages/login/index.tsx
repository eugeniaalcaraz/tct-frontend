import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, Fade, TextField, Typography } from "@mui/material";
import { Container, ForgotPassword, Messages } from "./LoginStyles";
import { getCurrentUser, setLocalStorage, urlFormat } from "@/utils";
import { LocalStorageKeys, Pages } from "@/types";
import { Loader } from "@components/common/loader";
import { useAppDispatch } from "@/state/app/hooks";
import { setIdMerchant } from "@/state/features/user";

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [landing, setLanding] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleUser = (e) => {
        setUser(e.target.value);
        setError(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setError(false);
    };

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault(e);
        try {
            const data = await Auth.signIn(user, password);

            setLocalStorage(LocalStorageKeys.user, {
                accessToken: data.Session,
                email: data.username,
                idMerchant: 1,
            });
            setLoading(false);
            navigate(urlFormat(Pages.Dashboard));
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (getCurrentUser()) {
            dispatch(setIdMerchant(getCurrentUser().idMerchant));
            navigate("/");
        }
    }, []);

    return (
        <>
            <Container>
                <Fade in={landing}>
                    <Typography
                        sx={{
                            letterSpacing: "0.15rem",
                            textTransform: "uppercase",
                            fontWeight: 400,
                            fontSize: "1.5rem",
                        }}
                        variant="h1"
                        gutterBottom
                        color="primary"
                    >
                        Inicio de Sesión
                    </Typography>
                </Fade>
                <Messages className={error ? "open" : ""}>
                    <Typography>Whops! Parece que algo salió mal.</Typography>
                    <Typography>
                        Chequea que tu usuario y/o contraseña sean correctos
                    </Typography>
                </Messages>
                <form onSubmit={onSubmit}>
                    <TextField
                        id="standard-basic"
                        label="Usuario"
                        variant="standard"
                        value={user}
                        onChange={handleUser}
                        autoComplete="on"
                        error={error}
                        fullWidth
                    />
                    <TextField
                        id="standard-password-input"
                        type="password"
                        label="Contraseña"
                        variant="standard"
                        value={password}
                        onChange={handlePassword}
                        autoComplete="on"
                        error={error}
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        color="secondary"
                        fullWidth
                        sx={{
                            textTransform: "capitalize",
                            letterSpacing: "0.1rem",
                            fontSize: "1rem",
                        }}
                    >
                        {loading ? <Loader /> : "Ingresar"}
                    </Button>

                    <ForgotPassword
                        tabIndex={0}
                        href="!#"
                        sx={{ textDecoration: "none" }}
                    >
                        <Typography sx={{ fontSize: "0.9rem" }} variant="body2">
                            Olvide mi contraseña
                        </Typography>
                    </ForgotPassword>
                </form>
            </Container>
        </>
    );
};

export { Login };
