import React, { FC, useEffect, useState, useCallback } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setData } from "@/state/features/updatedProduct";

type DateProps = {
    name: string;
    initialValue?: Dayjs | null;
};

const UpdateDate: FC<DateProps> = ({ name, initialValue = null }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<Dayjs | string | null>(initialValue);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const handleChange = (e) => {
        dispatch(
            setData({
                [name]: dayjs(e).format("YYYY-MM-DD"),
            })
        ),
            // setValue(dayjs(e).format("YYYY-MM-DD"));
            setOpenCalendar(false);
    };

    // const setChange = useCallback(
    //     () =>
    //         dispatch(
    //             setData({
    //                 [name]: (dayjs(e).format("YYYY-MM-DD")),
    //             })
    //         ),
    //     [value]
    // );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className="datePicker"
                value={value}
                onChange={handleChange}
                onClose={() => setOpenCalendar(false)}
                open={openCalendar}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        onClick={() => setOpenCalendar(true)}
                        size="small"
                        variant="standard"
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export { UpdateDate };
