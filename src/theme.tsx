import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-date-pickers/themeAugmentation";

export const theme = createTheme({
    spacing: 10,
    palette: {
        primary: {
            main: "#233906",
            light: "#B5BBAD",
        },
        secondary: {
            main: "#839270",
            light: "rgba(131, 146, 112, 0.6)",
        },
        warning: {
            main: "#CEB471",
            light: "rgba(206, 180, 113, 0.6)",
        },
        error: {
            main: "#BB855E",
            light: "rgba(187, 133, 94, 0.6)",
        },
        // disabled: {
        //     main: "#D0D8D0",
        //     text: "#D9D9D9",
        // },
        background: {
            default: "#E4E4E4",
        },
    },

    typography: {
        fontFamily: "Open Sans, sans-serif",
        h1: {
            fontSize: "2rem",
            fontWeight: 400,
            lineHeight: 1.12,
        },
        h2: {
            fontWeight: 600,
            fontSize: "1.3rem",
            lineHeight: 1.3,
            letterSpacing: "0.1rem",
        },
        body2: {
            fontWeight: 400,
            fontSize: "1.1rem",
            lineHeight: 1.6,
            letterSpacing: "0.1rem",
        },
    },
    shadows: [
        "none",
        "0px 2px 4px rgba(0, 0, 0, 0.075)",
        "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "0px 16px 48px rgba(0, 0, 0, 0.176)",
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
        "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
        "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
        "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
        "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
        "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
        "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
        "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
        "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
        "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
        "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
        "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
    ],
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#E8E8E8",
                    color: "#233906",
                    padding: "1.8rem",
                    borderRadius: "5px",
                },
            },
        },
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "inherit",
                    maxHeight: "50rem",
                },
                viewTransitionContainer: {
                    height: "inherit",
                    "& > *": {
                        height: "inherit",
                    },
                },
            },
        },
        MuiCalendarOrClockPicker: {
            styleOverrides: {
                root: {
                    background: "transparent",
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    justifyContent: "space-around",
                    height: "inherit",
                    "&& > div": {
                        margin: 0,
                        width: "100%",
                        height: "inherit",
                        minHeight: "40rem",
                    },
                },
            },
        },
        MuiPickerStaticWrapper: {
            styleOverrides: {
                root: {
                    background: "transparent",
                },
                content: {
                    background: "transparent",
                },
            },
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                root: { padding: 0, marginTop: 0 },
                labelContainer: {
                    fontSize: "1.6rem",
                    fontWeight: 500,
                    textTransform: "capitalize",
                },
                switchViewIcon: {
                    height: "2rem",
                    width: "2rem",
                },
            },
        },
        MuiPickersArrowSwitcher: {
            styleOverrides: {
                button: {
                    "&& > svg": {
                        width: "2rem",
                        height: "2rem",
                        fill: "#233906",
                    },
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    fontSize: "1.3rem",
                    margin: "0.6rem",
                    background: "transparent",
                },
            },
        },
        MuiDayPicker: {
            styleOverrides: {
                header: {
                    justifyContent: "space-between",
                },
                weekDayLabel: {
                    fontSize: "1.3rem",
                },
                slideTransition: {
                    overflowY: "hidden",
                    minHeight: "30rem",
                    height: "inherit",
                    "& > *": {
                        height: "inherit",
                    },
                },
            },
        },
        MuiCalendarPickerSkeleton: {
            styleOverrides: {
                daySkeleton: {
                    margin: "0.6rem",
                },
            },
        },
        PrivatePickersYear: {
            styleOverrides: {
                yearButton: {
                    fontSize: "1.3rem",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-disabled": {
                        background: "rgba(218, 217, 217, 0.5)",
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    textTransform: "capitalize",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    maxHeight: "3.5rem",
                },
            },
        },
    },
});
