import React, { FC, useEffect, useState, useCallback } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { handleSelectChange } from "@/state/features";
import { useAppDispatch } from "@/state/app/hooks";

type DateProps = {
    label: string;
    type: string;
};

const Date: FC<DateProps> = ({ label, type }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<Dayjs | null>(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const handleChange = (e) => {
        setValue(e);
        setOpenCalendar(false);
    };

    const filter = useCallback(
        () =>
            dispatch(
                handleSelectChange({
                    label: `${type}`,
                    value: value?.format("YYYY-MM-DD") ?? "",
                })
            ),
        [value]
    );

    useEffect(() => {
        filter();
    }, [value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className="datePicker"
                value={value}
                label={label}
                onChange={handleChange}
                open={openCalendar}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onClick={() => setOpenCalendar(true)}
                        size="small"
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export { Date };
