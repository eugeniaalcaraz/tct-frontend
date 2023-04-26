import React, { FC, FocusEventHandler } from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { SyledTextField } from "@components/common/textInput/StyledTextField";

type ControlledProps = {
    id?: string | number;
    name: string;
    label?: string;
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
    readOnly?: boolean;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: boolean;
    helperText?: string;
    maxLength?: number;
    defaultValue?: string | number;
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
    maxLength,
    defaultValue,
}) => {
    return (
        <Controller
            shouldUnregister
            name={name}
            render={({ field: { onChange } }) => (
                <SyledTextField
                    size="small"
                    id={String(id)}
                    label={label}
                    onChange={onChange}
                    autoComplete="off"
                    disabled={disabled}
                    // className={`input ${error ? "error" : ""}`}
                    multiline={multiline}
                    rows={rows}
                    inputProps={{ maxLength }}
                    InputProps={{
                        readOnly: readOnly,
                    }}
                    onBlur={onBlur}
                    error={error}
                    helperText={helperText}
                    defaultValue={defaultValue}
                />
            )}
        />
    );
};

export { ControlledInput };
