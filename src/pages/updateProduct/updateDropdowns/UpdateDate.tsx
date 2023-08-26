import React, { FC, useState } from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "@/state/app/hooks";
import {
    setEntryDate,
    setShippingDates,
    setWarehouseDate,
} from "@/state/features/updatedProduct";

type DateProps = {
    name: string;
    initialValue?: Dayjs | null;
};

const UpdateDate: FC<DateProps> = ({ name, initialValue = null }) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<Dayjs | string | null>(initialValue);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const handleChange = (e) => {
        const newDate = dayjs(e).format("YYYY-MM-DD");
        switch (name) {
            case "shippingDate":
                dispatch(setShippingDates(newDate));
                break;
            case "warehouseEntryDate":
                dispatch(setWarehouseDate(newDate));
                break;
            case "entryDate":
                dispatch(setEntryDate(newDate));
                break;
            default:
                return;
        }

        setOpenCalendar(false);
    };

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
                        sx={{ width: "15rem" }}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export { UpdateDate };
