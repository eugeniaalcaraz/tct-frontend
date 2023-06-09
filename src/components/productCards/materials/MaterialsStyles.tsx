import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "3rem",

    "&& > .MuiTextField-root": {
        width: "100%",
    },

    "&& > .add > button": {
        fontWeight: 600,
        fontSize: "1.3rem",
        lineHeight: "1.8rem",
        letterSpacing: "0.15em",
        maxHeight: "3.5rem",
        margin: "1.5rem 0",
    },
    "&& > h3": {
        width: "100%",
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: "1.8rem",
        margin: "0 0 1.5rem ",
    },
}) as typeof Box;

export const FabricContainer = styled(Box)({
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",

    "& > .qualities, & > .existingQualities": {
        marginBottom: "1rem",
        width: "100%",
        display: "flex",
        flexDirection: "colum",
        flexWrap: "wrap",
        gap: "1rem",
        overflow: "hidden",
        paddingTop: "0.5rem",
        maxHeight: "4.1rem",
        transition: "all 0.8s ease",

        "& > div": {
            display: "flex",
            gap: "1rem",
            width: "100%",

            "& > .dropdown": {
                width: "67%",
            },
            "&  > .input": {
                flex: 1,
            },
        },
    },

    "&& > .existingQualities": {
        "& > div": {
            "& > .input": {
                marginBottom: "0.5rem",
                maxHeigth: "3.5rem",
                transition: "all 0.8s ease",
            },
            "& > .input:nth-of-type(2)": {
                maxWidth: "31.5%",
            },
        },
    },

    "&&  > .weight ": {
        width: 0,
        overflowY: "initial",
        overflowX: "hidden",
        transition: "width 0.8s ease",

        "& > .input": {
            width: "100%",
        },

        "&.selectedQuality": {
            width: "31.5%",
            overflowX: "inherit",
        },
    },

    "&& > .newQuality": {
        display: "flex",
        gap: "1rem",
        width: "100%",
        "& > .input": {
            flex: 1,
            maxHeight: "3.5rem",
            transition: "all 0.8s ease",
        },

        "&.error > .input": {
            maxHeight: "6rem",
        },
        "& > .input:nth-of-type(2)": {
            maxWidth: "31.5%",
        },
    },

    "&& > .dropdown": {
        width: "67%",
    },

    "&& > .input": {
        flex: 1,
        maxHeight: "3.5rem",
        transition: "all 0.8s ease",
    },

    "&&.error > .input": {
        flex: 1,
        maxHeight: "6rem",
    },

    "&& > button": {
        fontWeight: 600,
        fontSize: "1.3rem",
        lineHeight: "1.8rem",
        letterSpacing: "0.15em",
        height: "calc(100% - 1rem)",
        maxHeight: "3.5rem",
    },

    "&& > .combos": {
        width: "100%",
        display: "flex",
        gap: "2rem",
        paddingLeft: "1rem",
        marginBottom: "1rem",

        "& > .combo": {
            fontSize: "1.3rem",
            "& > div": {
                width: "5.5rem",
                height: "3rem",
                border: "1px solid",
                borderRadius: "2px",
            },
            "& > .printed": {
                backgroundImage: "url('src/assets/images/printExample.jpeg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100px 100px",
                opacity: 0.7,
            },
        },
    },

    "&& > .comboBoxTrims": {
        height: 0,
        width: "100%",
        gap: "1.2rem",
        overflow: "hidden",
        display: "flex",
        transition: "height .8s ease, width .8s ease, padding .3s ease",

        "& > .dropdown": {
            width: "67%",
        },
        "& > button": {
            width: "fit-content",
            fontWeight: 600,
            fontSize: "1.3rem",
            lineHeight: "1.8rem",
            letterSpacing: "0.15em",
            height: "3.5rem",
        },
    },

    "&& > .comboBox": {
        height: 0,
        width: "67%",
        gap: "1.2rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        paddingLeft: "1rem",
        transition: "height .8s ease, width .8s ease, padding .3s ease",

        "& > div": {
            display: "flex",

            "& > .dropdown": {
                flex: 1,
            },

            "& > .inputWrapper": {
                flex: 1,
                display: "flex",
                gap: "1rem",

                "& > div:first-of-type": {
                    width: "60%",
                },
                "& > div:last-of-type": {
                    flex: 1,
                },
            },
        },

        "& > button": {
            width: "fit-content",
            fontWeight: 600,
            fontSize: "1.3rem",
            lineHeight: "1.8rem",
            letterSpacing: "0.15em",
            height: "3.5rem",
        },
    },

    "&& > .estampado": {
        width: "100%",
    },

    "&& > .open": {
        height: "10rem",
        paddingTop: "1rem",
    },

    "&& > h3": {
        width: "100%",
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: "1.8rem",
        margin: "2.5rem 0 1.5rem ",
    },
}) as typeof Box;
