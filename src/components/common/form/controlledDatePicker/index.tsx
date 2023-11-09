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
    shouldUnregister?: boolean;
    size?: "small" | "medium";
    disableDefaultDate?: boolean;
    disablePast?: boolean;
};

const ControlledDatePicker: FC<ControlledDatePickerProps> = ({
    name,
    label,
    useFormHook = true,
    externalOnChange,
    disabled = false,
    shouldUnregister = true,
    size = "medium",
    disableDefaultDate = false,
    disablePast = true
}) => {
    const [valueControlled, setValueControlled] = useState<Dayjs | null>(dayjs().add(15, "day"));
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    if (!useFormHook) {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={label}
                    disabled={disabled}
                    onChange={(event) => {
                        externalOnChange(event);
                        const [valueControlled, setValueControlled] = useState<Dayjs | null>(dayjs().add(15, "day"));
                        (event as Dayjs);
                        setOpenCalendar(false);
                    }}
                    value={valueControlled}
                    open={openCalendar}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onClick={() => setOpenCalendar(true)}
                        />
                    )}
                    disablePast={disablePast}
                />
            </LocalizationProvider>
        );
    }

    return (
        <Controller
            name={name}
            defaultValue={disableDefaultDate ? null : dayjs().add(15, "day")}
            shouldUnregister={shouldUnregister}
            render={({ field: { onChange, value, ...restField }, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={label}
                        disabled={disabled}
                        onChange={(event) => {
                            console.log(event)
                            onChange(event.$d);
                            setValueControlled(event.$d);
                            setOpenCalendar(false);
                        }}
                        value={value}

                        open={openCalendar}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size={size}
                                inputProps={{style: size == "small" ? {padding: '10.5px'} : {}, ...params.inputProps}}
                                onClick={() => setOpenCalendar(true)}
                            />
                        )}
                        disablePast={disablePast}
                        {...restField}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export { ControlledDatePicker };
