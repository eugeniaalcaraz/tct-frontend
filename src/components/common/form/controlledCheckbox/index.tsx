import React, { FC } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

type ControlledCheckboxProps = {
    name: string;
    label: string;
    defaultCheckedProp?: boolean;
    externalOnChange?: any;
    shouldUnregister?: boolean;
};

export const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
    name,
    defaultCheckedProp = false,
    label,
    externalOnChange,
    shouldUnregister = true
}) => {
    return (
        <Controller
            shouldUnregister={shouldUnregister}
            name={name}
            render={({ field: { onChange } }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(e) => {
                                onChange(e);
                                externalOnChange && externalOnChange(e);
                            }}
                            defaultChecked={defaultCheckedProp}
                        />
                    }
                    label={label}
                />
            )}
        />
    );
};
