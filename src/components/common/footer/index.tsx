import React from "react";
import logo from "@/assets/images/logo_alone.png";
import { Container } from "./FooterStyles";

const Footer = () => {
    return (
        <Container>
            <img
                src={logo}
                alt="logo"
                style={{
                    width: "12rem",
                    height: "8rem",
                    objectFit: "cover",
                }}
            />
            Connecting Retail Management to the circles
        </Container>
    );
};

export { Footer };
