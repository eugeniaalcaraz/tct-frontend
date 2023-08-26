import React, { FC, FocusEventHandler } from "react";
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
    type?: React.HTMLInputTypeAttribute;
    maxLength?: number;
    defaultValue?: string | number;
    externalOnChange?: (e) => void;
    useFormhook?: boolean;
    externalValue?: string;
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
    type = "text",
    maxLength,
    defaultValue,
    externalOnChange,
    useFormhook = true,
    externalValue = "",
}) => {
    if (useFormhook) {
        return (
            <Controller
                shouldUnregister
                defaultValue={""}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <SyledTextField
                        size="small"
                        id={String(id)}
                        label={label}
                        value={value}
                        onChange={(e) => {
                            onChange(e);
                            externalOnChange && externalOnChange(e);
                        }}
                        type={type}
                        autoComplete="off"
                        disabled={disabled}
                        className={`input ${error ? "error" : ""}`}
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
    }

    return (
        <SyledTextField
            size="small"
            id={String(id)}
            label={label}
            value={externalValue}
            onChange={(e) => {
                externalOnChange && externalOnChange(e);
            }}
            autoComplete="off"
            disabled={disabled}
            className={` ${error ? "error" : ""}`}
            multiline={multiline}
            rows={rows}
            inputProps={{ maxLength }}
            InputProps={{
                readOnly: readOnly,
            }}
            type={type}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
        />
    );
};

export { ControlledInput };
