import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, useState } from "react";
import { Controller } from "react-hook-form";

type ControlledDatePickerProps = {
    name: string;
    label: string;
    useFormHook?: boolean;
    externalOnChange?: any;
    disabled?: boolean;
};

const ControlledDatePicker: FC<ControlledDatePickerProps> = ({
    name,
    label,
    useFormHook = true,
    externalOnChange,
    disabled = false,
}) => {
    const [value, setValue] = useState<Dayjs | null>(dayjs().add(15, "day"));
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    if (!useFormHook) {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={label}
                    disabled={disabled}
                    onChange={(event) => {
                        externalOnChange(event);
                        setValue(event as Dayjs);
                        setOpenCalendar(false);
                    }}
                    value={value}
                    open={openCalendar}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onClick={() => setOpenCalendar(true)}
                        />
                    )}
                    disablePast
                />
            </LocalizationProvider>
        );
    }

    return (
        <Controller
            name={name}
            defaultValue={value}
            shouldUnregister
            render={({ field: { onChange, ...restField } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={label}
                        disabled={disabled}
                        onChange={(event) => {
                            onChange(event);
                            setValue(event);
                            setOpenCalendar(false);
                        }}
                        open={openCalendar}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onClick={() => setOpenCalendar(true)}
                            />
                        )}
                        disablePast
                        {...restField}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export { ControlledDatePicker };
