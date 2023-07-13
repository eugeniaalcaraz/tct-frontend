import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import { MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setData } from "@/state/features/updatedProduct";
import {
    setIndustriesByUnit,
    setTipologiesByIndustry,
} from "@/state/features/product";
import {
    getMerchantIndustryDropdownValue,
    getMerchantTypologyDropdownValue,
} from "@/services/ProductRequests";

type UpdateProps = {
    value: string | number;
    name: string;
    options: { Id: string | number; Description: string }[];
    disabled?: boolean;
};

const UpdateDropdown: FC<UpdateProps> = ({
    value,
    name,
    options,
    disabled,
}) => {
    const { idMerchant } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleChange = async (e, state) => {
        dispatch(setData({ [state]: e.target.value }));
        if (name === "idManagementUnit") {
            dispatch(
                setIndustriesByUnit(
                    await getMerchantIndustryDropdownValue({
                        idManagementUnit: e.target.value,
                        idMerchant,
                    })
                )
            );
        } else if (name === "idIndustry") {
            dispatch(
                setTipologiesByIndustry(
                    await getMerchantTypologyDropdownValue({
                        idIndustry: e.target.value,
                    })
                )
            );
        }
    };

    return (
        <Select
            size="small"
            sx={{
                width: "15rem",
            }}
            value={value}
            onChange={(e) => handleChange(e, name)}
            disabled={disabled}
        >
            <MenuItem value={""}>No option selected</MenuItem>
            {options?.map((option) => (
                <MenuItem key={uuid()} value={option?.Id}>
                    {option?.Description}
                </MenuItem>
            ))}
        </Select>
    );
};

export { UpdateDropdown };
