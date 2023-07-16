import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    SelectChangeEvent,
    OutlinedInput,
} from "@mui/material";

import { useAppDispatch } from "@/state/app/hooks";
import { handleDashboardData, handleSelectChange } from "@/state/features";
import { OptionsType } from "@/types";

type DropdownProps = {
    value: string;
    label: string;
    options: OptionsType[];
    multipleSelect?: boolean;
    disabled?: boolean;
    variant?: string;
    onBlur?: () => void;
    onChange?: (...args) => void;
};

const Dropdown: FC<DropdownProps> = ({
    value,
    label,
    options,
    multipleSelect = true,
    disabled = false,
    variant = "filters",
    onBlur,
    onChange,
}) => {
    const dispatch = useAppDispatch();

    const handleDropdownChange = (event: SelectChangeEvent, state: string) => {
        const {
            target: { value },
        } = event;
        onChange && onChange(value);
        variant === "filters"
            ? dispatch(
                  handleSelectChange({
                      label: state,
                      value:
                          typeof value === "string" ? value.split(",") : value,
                  })
              )
            : dispatch(
                  handleDashboardData({
                      name: state?.toLowerCase(),
                      value: value,
                  })
              );
    };

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
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                multiple={multipleSelect}
                label={label}
                onChange={(e) => handleDropdownChange(e, label)}
                input={<OutlinedInput label={label} />}
                onBlur={onBlur}
            >
                {options.map((option) => (
                    <MenuItem key={uuid()} value={option.Id}>
                        {option.Description}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export { Dropdown };
