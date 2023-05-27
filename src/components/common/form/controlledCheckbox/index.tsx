import React, { FC } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

type ControlledCheckboxProps = {
    name: string;
    label: string;
    defaultCheckedProp?: boolean;
};

export const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
    name,
    defaultCheckedProp = false,
    label,
}) => {
    return (
        <Controller
            shouldUnregister
            name={name}
            render={({ field: { onChange } }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={onChange}
                            defaultChecked={defaultCheckedProp}
                        />
                    }
                    label={label}
                />
            )}
        />
    );
};
