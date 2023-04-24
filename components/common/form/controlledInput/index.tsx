import React, { FC, FocusEventHandler } from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type ControlledProps = {
    id?: string | number;
    name: string;
    label?: string;
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
    readOnly?: boolean;
    onBlur?:
        | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    error?: boolean;
    helperText?: string;
};

const ControlledInput: FC<ControlledProps> = ({
    id,
    name,
    label,
    disabled = false,
    multiline = false,
    rows = 1,
    readOnly = false,
    onBlur,
    error = false,
    helperText = "",
}) => {
    return (
        <Controller
            shouldUnregister
            name={name}
            render={({ field: { onChange } }) => (
                <TextField
                    sx={{
                        width: "13rem",
                        maxWidth: "100%",
                        "&& > *": { fontSize: "1.3rem" },
                        "&& > label": { textTransform: "capitalize" },
                        "&& > p": {
                            margin: 0,
                            paddingTop: "0.5rem",
                            paddingLeft: "0.5rem",
                            height: 0,
                            overflow: "hidden",
                            fontSize: "1rem",
                            transition: "all 0.8s ease",
                        },
                        "&&.error > p": {
                            height: "2.1rem",
                        },
                    }}
                    size="small"
                    id={String(id)}
                    label={label}
                    onChange={onChange}
                    autoComplete="off"
                    disabled={disabled}
                    className={`input ${error ? "error" : ""}`}
                    multiline={multiline}
                    rows={rows}
                    InputProps={{
                        readOnly: readOnly,
                    }}
                    onBlur={onBlur}
                    error={error}
                    helperText={helperText}
                />
            )}
        />
    );
};

export { ControlledInput };
