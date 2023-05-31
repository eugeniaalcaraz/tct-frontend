import React, { FC } from "react";
import logo from "@/assets/images/logo_alone.png";

import { Container, LogoutContainer } from "./NavbarStyles";
import { urlFormat } from "@/utils";
import { Pages } from "@/types";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@/services";

import styles from "./Navbar.module.css";
import { useIconsContext } from "@components/hooks";

type NavbarProps = {
    open?: boolean;
    handleMenu: (arg: boolean) => void;
};

const navLinks = [
    Pages.Dashboard,
    Pages.Products,
    Pages.NewProduct,
    Pages.UpdateProduct,
];

const Navbar: FC<NavbarProps> = ({ open, handleMenu }) => {
    const navigate = useNavigate();
    const { icons } = useIconsContext();

    const handleLogout = () => {
        logout();
        navigate(urlFormat(Pages.Login));
    };

    return (
        <Container
            onClick={() => handleMenu(false)}
            className={open ? "open" : "closed"}
        >
            <ul>
                <img src={logo} alt="logo" />
                {navLinks.map((link) => (
                    <NavLink
                        to={urlFormat(link)}
                        key={link}
                        className={({ isActive }) =>
                            isActive ? styles.active : undefined
                        }
                    >
                        <li>{link}</li>
                    </NavLink>
                ))}
            </ul>
            <LogoutContainer onClick={handleLogout}>
                Logout
                {icons["logout"]}
            </LogoutContainer>
        </Container>
    );
};

export { Navbar };
