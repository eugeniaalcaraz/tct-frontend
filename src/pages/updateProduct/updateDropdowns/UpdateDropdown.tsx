import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import { MenuItem, Select } from "@mui/material";
import { useAppDispatch } from "@/state/app/hooks";
import { setData } from "@/state/features/updatedProduct";

type UpdateProps = {
    value: string | number;
    name: string;
    options: { Id: string | number; Description: string }[];
};

const UpdateDropdown: FC<UpdateProps> = ({ value, name, options }) => {
    const dispatch = useAppDispatch();

    const handleChange = (e, state) => {
        dispatch(setData({ [state]: e.target.value }));
    };

    return (
        <Select
            size="small"
            sx={{
                width: "15rem",
            }}
            value={value}
            onChange={(e) => handleChange(e, name)}
        >
            {options?.map((option) => (
                <MenuItem key={uuid()} value={option?.Id}>
                    {option?.Description}
                </MenuItem>
            ))}
        </Select>
    );
};

export { UpdateDropdown };
