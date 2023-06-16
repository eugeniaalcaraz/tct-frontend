import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import {
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { OptionsType, FabricOptionType } from "@/types";
import { HelperText } from "./ControlledDropdownStyles";

type ControlledDropdownProps = {
    name: string;
    label: string;
    options: OptionsType[] | FabricOptionType[];
    multipleSelect?: boolean;
    disabled?: boolean;
    onBlur?: (e) => void;
    error?: boolean;
    helperText?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    externalOnChange?: Function;
    shouldUnregister?: boolean;
    useFormHook?: boolean;
    selectedValue?: any;
};

const ControlledDropdown: FC<ControlledDropdownProps> = ({
    name,
    label,
    options,
    multipleSelect = false,
    disabled = false,
    onBlur,
    error = false,
    helperText = "",
    externalOnChange,
    shouldUnregister = true,
    useFormHook = true,
    selectedValue = "",
}) => {
    return (
        <FormControl
            size="small"
            sx={{
                minWidth: "13rem",

                "&& > *": {
                    fontSize: "1.3rem",
                },
                "&& > label": {
                    textTransform: "capitalize",
                },
            }}
            disabled={disabled}
            className="dropdown"
        >
            {useFormHook ? (
                <Controller
                    shouldUnregister={shouldUnregister}
                    name={name}
                    render={({
                        field: { value = multipleSelect ? [] : "", onChange },
                    }) => (
                        <>
                            <InputLabel
                                id="demo-simple-select-label"
                                error={error}
                            >
                                {label}
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={value}
                                multiple={multipleSelect}
                                label={label}
                                onChange={(e) => {
                                    onChange(e);
                                    externalOnChange &&
                                        externalOnChange({
                                            value: e.target.value,
                                            name,
                                        });
                                }}
                                input={<OutlinedInput label={label} />}
                                onBlur={onBlur}
                                error={error}
                            >
                                {options.map((option) => (
                                    <MenuItem key={uuid()} value={option.Id}>
                                        {option.Description}
                                    </MenuItem>
                                ))}
                            </Select>
                            <HelperText className={error ? "error" : ""}>
                                {helperText}
                            </HelperText>
                        </>
                    )}
                />
            ) : (
                <>
                    <InputLabel id="demo-simple-select-label" error={error}>
                        {label}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedValue}
                        multiple={multipleSelect}
                        label={label}
                        onChange={(e) => {
                            externalOnChange &&
                                externalOnChange({
                                    value: e.target.value,
                                    name,
                                });
                        }}
                        input={<OutlinedInput label={label} />}
                        onBlur={onBlur}
                        error={error}
                    >
                        {options.map((option) => (
                            <MenuItem key={uuid()} value={option.Id}>
                                {option.Description}
                            </MenuItem>
                        ))}
                    </Select>
                    <HelperText className={error ? "error" : ""}>
                        {helperText}
                    </HelperText>
                </>
            )}
        </FormControl>
    );
};

export { ControlledDropdown };
