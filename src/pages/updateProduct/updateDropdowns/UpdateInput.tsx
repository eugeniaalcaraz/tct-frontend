import React, { FC } from "react";
import { TextField } from "@mui/material";
import { useAppDispatch } from "@/state/app/hooks";
import { setData } from "@/state/features/updatedProduct";

type UpdateProps = {
    name?: string;
    value: string | number;
};

const UpdateInput: FC<UpdateProps> = ({ name, value }) => {
    const dispatch = useAppDispatch();

    const handleChange = (e, state) => {
        dispatch(setData({ [state]: e.target.value }));
    };

    return (
        <TextField
            onChange={(e) => handleChange(e, name)}
            defaultValue={value}
            variant="standard"
            size="small"
            sx={{
                width: "calc(100% - 15rem)",
            }}
        />
    );
};

export { UpdateInput };
