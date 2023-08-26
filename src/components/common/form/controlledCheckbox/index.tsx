import React, { FC } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

type ControlledCheckboxProps = {
    id?: string | number;
    name: string;
    label?: string;
    disabled?: boolean;
};

const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
    id,
    name,
    label,
    disabled = false
}) => {
    return (
        <Controller
            name={name}
            render={({ field: { onChange, value } }) => (
                <FormControlLabel
                    sx={{"&& > .MuiFormControlLabel-label ": {fontSize: '12px'}}}
                    control={
                        <Checkbox
                            id={String(id)}
                            onChange={e => onChange(e.target.checked)}
                            checked={value}
                            disabled={disabled}
                            color="primary"
                        />
                    }
                    label={label}
                />
            )}
        />
    );
};

export { ControlledCheckbox };
