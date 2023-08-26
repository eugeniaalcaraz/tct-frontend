import React, { FC } from "react";
import {
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { useAppDispatch } from "@/state/app/hooks";
import { setData } from "@/state/features/updatedProduct";

type UpdateRadioProps = {
    value: string;
    name: string;
};

const UpdateRadio: FC<UpdateRadioProps> = ({ value, name }) => {
    const dispatch = useAppDispatch();

    const handleChange = (e) => {
        dispatch(setData({ [name]: JSON.parse(e.target.value) }));
    };

    return (
        <FormControl className="radios">
            <RadioGroup
                row
                onChange={handleChange}
                value={value === "Si" ? true : false}
            >
                <FormControlLabel value={true} control={<Radio />} label="Si" />
                <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                />
            </RadioGroup>
        </FormControl>
    );
};

export { UpdateRadio };
